import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// AI Agent definitions
@Entity('ai_agents')
export class AiAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  role: string; // pdg, accountant, marketer, salesperson, etc.

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb' })
  capabilities: string[];

  @Column({ type: 'jsonb', nullable: true })
  config: Record<string, any>;

  @Column({ default: 'llama3.2:latest' })
  model: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  tasksCompleted: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// AI Conversations
@Entity('ai_conversations')
export class AiConversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agentId: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  context: string;

  @Column({ type: 'jsonb', nullable: true })
  messages: Record<string, any>[];

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// AI Tasks
@Entity('ai_tasks')
export class AiTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agentId: string;

  @Column()
  type: string; // analysis, generation, automation, etc.

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  input: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  output: Record<string, any>;

  @Column({ default: 'pending' })
  status: string; // pending, running, completed, failed

  @Column({ nullable: true })
  error: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// Orchestration workflows
@Entity('orchestration_workflows')
export class OrchestrationWorkflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb' })
  steps: Record<string, any>[];

  @Column({ type: 'jsonb', nullable: true })
  agents: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// AI Memories for context
@Entity('ai_memories')
export class AiMemory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // conversation, fact, preference, etc.

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  sessionId: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
