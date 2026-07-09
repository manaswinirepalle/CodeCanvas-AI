import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { OpenAiService } from './providers/openai.service';
import { AgentOrchestrator } from './agents/orchestrator';
import { PlannerAgent } from './agents/planner.agent';
import { UiDesignerAgent } from './agents/ui-designer.agent';
import { FrontendAgent } from './agents/frontend.agent';
import { BackendAgent } from './agents/backend.agent';
import { DatabaseAgent } from './agents/database.agent';
import { ApiAgent } from './agents/api.agent';
import { TestingAgent } from './agents/testing.agent';
import { SecurityAgent } from './agents/security.agent';
import { PerformanceAgent } from './agents/performance.agent';
import { SeoAgent } from './agents/seo.agent';
import { DeploymentAgent } from './agents/deployment.agent';
import { DocumentationAgent } from './agents/documentation.agent';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [AiController],
  providers: [
    AiService,
    OpenAiService,
    AgentOrchestrator,
    PlannerAgent,
    UiDesignerAgent,
    FrontendAgent,
    BackendAgent,
    DatabaseAgent,
    ApiAgent,
    TestingAgent,
    SecurityAgent,
    PerformanceAgent,
    SeoAgent,
    DeploymentAgent,
    DocumentationAgent,
  ],
  exports: [AiService],
})
export class AiModule {}
