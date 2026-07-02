import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiOrchestratorService } from './ai-orchestrator.service';

@ApiTags('AI Orchestrator')
@Controller('ai')
export class AiOrchestratorController {
  constructor(private readonly aiOrchestratorService: AiOrchestratorService) {}

  @Get('status')
  @ApiOperation({ summary: 'Check AI services status' })
  async getStatus() {
    const ollamaConnected = await this.aiOrchestratorService.checkOllamaConnection();
    const models = await this.aiOrchestratorService.getAvailableModels();
    
    return {
      status: ollamaConnected ? 'online' : 'offline',
      ollama: {
        connected: ollamaConnected,
        models,
      },
    };
  }

  @Post('chat')
  @ApiOperation({ summary: 'Chat with AI' })
  async chat(@Body() body: {
    messages: { role: string; content: string }[];
    model?: string;
    temperature?: number;
  }) {
    const response = await this.aiOrchestratorService.chat(
      body.messages,
      { model: body.model, temperature: body.temperature }
    );
    return { response };
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate text with AI' })
  async generate(@Body() body: {
    prompt: string;
    model?: string;
    system?: string;
    temperature?: number;
  }) {
    const response = await this.aiOrchestratorService.generateText(
      body.prompt,
      {
        model: body.model,
        system: body.system,
        temperature: body.temperature,
      }
    );
    return { response };
  }

  @Post('orchestrate')
  @ApiOperation({ summary: 'Orchestrate task to appropriate AI agent' })
  async orchestrate(@Body() body: {
    type: string;
    description: string;
    context?: Record<string, any>;
    agentRole?: string;
    model?: string;
  }) {
    const result = await this.aiOrchestratorService.orchestrateTask({
      type: body.type,
      description: body.description,
      context: body.context,
      agentRole: body.agentRole,
    });
    return result;
  }

  @Post('agent/:role')
  @ApiOperation({ summary: 'Chat with specific AI agent' })
  async chatWithAgent(
    @Param('role') role: string,
    @Body() body: {
      message: string;
      context?: Record<string, any>;
      model?: string;
    }
  ) {
    const systemPrompt = this.aiOrchestratorService.getAgentSystemPrompt(role);
    const response = await this.aiOrchestratorService.generateText(
      body.message,
      {
        system: systemPrompt,
        model: body.model,
      }
    );
    return { response, agent: role };
  }

  @Get('models')
  @ApiOperation({ summary: 'Get available AI models' })
  async getModels() {
    const models = await this.aiOrchestratorService.getAvailableModels();
    return { models };
  }
}
