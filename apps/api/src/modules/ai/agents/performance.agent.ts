import { Injectable } from '@nestjs/common';
import { AgentOrchestrator } from './orchestrator';

@Injectable()
export class PerformanceAgent {
  constructor(private readonly orchestrator: AgentOrchestrator) {}

  async execute(prompt: string, context: any) {
    return this.orchestrator.execute('PERFORMANCE', prompt, context);
  }
}
