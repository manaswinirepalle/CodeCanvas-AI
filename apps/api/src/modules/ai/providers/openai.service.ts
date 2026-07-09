import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly logger = new Logger(OpenAiService.name);
  private readonly client: OpenAI;

  constructor(private readonly config: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.config.get('OPENAI_API_KEY', ''),
    });
  }

  async generate(
    prompt: string,
    systemPrompt: string,
    model?: string,
  ): Promise<{ content: string; usage: { prompt: number; completion: number } }> {
    const modelName = model || this.config.get('OPENAI_MODEL', 'gpt-4-turbo');

    const response = await this.client.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    });

    const content = response.choices[0]?.message?.content || '';
    const usage = {
      prompt: response.usage?.prompt_tokens || 0,
      completion: response.usage?.completion_tokens || 0,
    };

    return { content, usage };
  }

  async chat(
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    model?: string,
  ): Promise<string> {
    const modelName = model || this.config.get('OPENAI_MODEL', 'gpt-4-turbo');

    const response = await this.client.chat.completions.create({
      model: modelName,
      messages,
      temperature: 0.7,
      max_tokens: 4096,
    });

    return response.choices[0]?.message?.content || '';
  }
}
