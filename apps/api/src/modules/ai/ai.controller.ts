import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate using AI agent' })
  async generate(
    @Body() body: { projectId: string; prompt: string; agentType: string; model?: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.aiService.generatePrompt(
      userId,
      body.projectId,
      body.prompt,
      body.agentType,
      body.model,
    );
  }

  @Post('chat/:sessionId')
  @ApiOperation({ summary: 'Chat with AI in session' })
  async chat(
    @Param('sessionId') sessionId: string,
    @Body('message') message: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.aiService.chat(userId, sessionId, message);
  }

  @Get('sessions/:projectId')
  @ApiOperation({ summary: 'Get AI sessions for project' })
  async getSessions(
    @Param('projectId') projectId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.aiService.getProjectSessions(projectId, userId);
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Get AI session details' })
  async getSession(
    @Param('sessionId') sessionId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.aiService.getSessionHistory(sessionId, userId);
  }

  @Get('usage')
  @ApiOperation({ summary: 'Get AI usage stats' })
  async getUsage(@CurrentUser('id') userId: string) {
    return this.aiService.getUsage(userId);
  }
}
