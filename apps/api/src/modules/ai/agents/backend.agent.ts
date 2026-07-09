import { Injectable } from '@nestjs/common';
import { AgentOrchestrator } from './orchestrator';

@Injectable()
export class BackendAgent {
  constructor(private readonly orchestrator: AgentOrchestrator) {}

  async execute(prompt: string, context: any) {
    return this.orchestrator.execute('BACKEND', prompt, context);
  }
}
