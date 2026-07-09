import { Injectable } from '@nestjs/common';
import { AgentOrchestrator } from './orchestrator';

@Injectable()
export class DatabaseAgent {
  constructor(private readonly orchestrator: AgentOrchestrator) {}

  async execute(prompt: string, context: any) {
    return this.orchestrator.execute('DATABASE', prompt, context);
  }
}
