import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiOrchestratorController } from './ai-orchestrator.controller';
import { AiOrchestratorService } from './ai-orchestrator.service';

@Module({
  imports: [ConfigModule],
  controllers: [AiOrchestratorController],
  providers: [AiOrchestratorService],
  exports: [AiOrchestratorService],
})
export class AiOrchestratorModule {}
