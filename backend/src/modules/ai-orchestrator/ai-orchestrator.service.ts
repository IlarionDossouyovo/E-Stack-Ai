import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

export interface AgentConfig {
  name: string;
  role: string;
  description: string;
  capabilities: string[];
  systemPrompt: string;
  model: string;
}

@Injectable()
export class AiOrchestratorService {
  private ollamaBaseUrl: string;
  private defaultModel: string;

  constructor(private configService: ConfigService) {
    this.ollamaBaseUrl = this.configService.get('ollama.baseUrl') || 'http://localhost:11434';
    this.defaultModel = this.configService.get('ollama.defaultModel') || 'llama3.2:latest';
  }

  async checkOllamaConnection(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.ollamaBaseUrl}/api/tags`);
      return response.data.models && response.data.models.length > 0;
    } catch (error) {
      console.error('Ollama connection failed:', error.message);
      return false;
    }
  }

  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.ollamaBaseUrl}/api/tags`);
      return response.data.models?.map((m: any) => m.name) || [];
    } catch (error) {
      console.error('Failed to get models:', error.message);
      return [];
    }
  }

  async generateText(prompt: string, options?: {
    model?: string;
    system?: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<string> {
    const model = options?.model || this.defaultModel;
    
    try {
      const response = await axios.post<OllamaResponse>(
        `${this.ollamaBaseUrl}/api/generate`,
        {
          model,
          prompt,
          system: options?.system,
          options: {
            temperature: options?.temperature || 0.7,
            num_predict: options?.maxTokens || 2048,
          },
          stream: false,
        },
        { timeout: 120000 }
      );
      
      return response.data.response;
    } catch (error) {
      throw new HttpException(
        `Ollama generation failed: ${error.message}`,
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  async chat(messages: { role: string; content: string }[], options?: {
    model?: string;
    temperature?: number;
  }): Promise<string> {
    const model = options?.model || this.defaultModel;
    
    try {
      const response = await axios.post<OllamaResponse>(
        `${this.ollamaBaseUrl}/api/chat`,
        {
          model,
          messages,
          options: {
            temperature: options?.temperature || 0.7,
          },
          stream: false,
        },
        { timeout: 120000 }
      );
      
      return response.data.message?.content || '';
    } catch (error) {
      throw new HttpException(
        `Ollama chat failed: ${error.message}`,
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  async getEmbedding(text: string, model?: string): Promise<number[]> {
    const embeddingModel = model || 'nomic-embed-text:latest';
    
    try {
      const response = await axios.post(
        `${this.ollamaBaseUrl}/api/embeddings`,
        {
          model: embeddingModel,
          prompt: text,
        },
        { timeout: 60000 }
      );
      
      return response.data.embedding;
    } catch (error) {
      throw new HttpException(
        `Ollama embedding failed: ${error.message}`,
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  getAgentSystemPrompt(role: string): string {
    const prompts: Record<string, string> = {
      pdg: `Tu es l'IA PDG d'E-Stack AI, une plateforme de gestion d'entreprise intelligente. Tu dois fournir des conseils stratégiques, analyser les données de l'entreprise et prendre des décisions assistées par l'IA. Réponds toujours de manière professionnelle et orientée business.`,
      accountant: `Tu es l'IA Comptable d'E-Stack AI. Tu gères les finances, la comptabilité, les factures, les transactions et les rapports financiers. Sois précis dans les chiffres et respecte les principes comptables.`,
      salesperson: `Tu es l'IA Commerciale d'E-Stack AI. Tu aides à la gestion des ventes, des devis, des commandes et des relations clients. Sois persuasif et orienté résultats.`,
      marketer: `Tu es l'IA Marketing d'E-Stack AI. Tu gères les campagnes marketing, la création de contenu, les réseaux sociaux et l'analyse des performances. Sois créatif et stratège.`,
      hr: `Tu es l'IA RH d'E-Stack AI. Tu gères les employés, les recrutements, la paie et les ressources humaines. Sois empathetic et professionnel.`,
      support: `Tu es l'IA Support Client d'E-Stack AI. Tu gères les tickets de support, les réclamations et la satisfaction client. Sois patient et efficace.`,
      analyst: `Tu es l'IA Analyste Data d'E-Stack AI. Tu analyses les données, génères des rapports et fournis des insights business. Sois analytique et précis.`,
      general: `Tu es un assistant IA intelligent faisant partie d'E-Stack AI, le système d'exploitation business intelligent. Réponds de manière helpful, professionnelle et précise.`,
    };

    return prompts[role] || prompts.general;
  }

  async orchestrateTask(task: {
    type: string;
    description: string;
    context?: Record<string, any>;
    agentRole?: string;
  }): Promise<{ response: string; agent: string }> {
    const agentRole = task.agentRole || this.detectAgentFromTask(task.type, task.description);
    const systemPrompt = this.getAgentSystemPrompt(agentRole);
    
    const fullPrompt = task.context 
      ? `${task.description}\n\nContexte: ${JSON.stringify(task.context)}`
      : task.description;

    const response = await this.generateText(fullPrompt, {
      system: systemPrompt,
    });

    return {
      response,
      agent: agentRole,
    };
  }

  private detectAgentFromTask(type: string, description: string): string {
    const text = `${type} ${description}`.toLowerCase();
    
    if (text.includes('finance') || text.includes('comptab') || text.includes('facture') || text.includes('paye')) {
      return 'accountant';
    }
    if (text.includes('vente') || text.includes('devis') || text.includes('commande') || text.includes('client')) {
      return 'salesperson';
    }
    if (text.includes('marketing') || text.includes('campagne') || text.includes('contenu') || text.includes('reseau')) {
      return 'marketer';
    }
    if (text.includes('rh') || text.includes('employe') || text.includes('recrut') || text.includes('paie')) {
      return 'hr';
    }
    if (text.includes('support') || text.includes('ticket') || text.includes('reclam') || text.includes('sav')) {
      return 'support';
    }
    if (text.includes('analys') || text.includes('donnee') || text.includes('rapport') || text.includes('kpi')) {
      return 'analyst';
    }
    
    return 'general';
  }
}
