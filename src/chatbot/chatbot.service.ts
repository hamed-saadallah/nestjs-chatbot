import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class ChatbotService {
  private apiUrl = 'https://api.openai.com/v1/completions';
  constructor(private configService: ConfigService) {}
  private openai = new OpenAI({
    apiKey: this.configService.get<string>('OPENAI_API_KEY'),
  });

  async getChatResponse(prompt: string): Promise<string> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    console.log(apiKey, this.apiUrl, prompt);
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 100,
    });
    return response.choices[0].message.content;
  }
}
