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
    const instructions = `SFCC Helper is tailored to provide examples based on the SFRA (Storefront Reference Architecture) 
    rather than pipeline-based examples, 
    acknowledging that SFRA is the more widely used and recommended approach in the SFCC community. 
    It will deliver up-to-date SFRA code snippets. 
    Provide links to references of documentation or code from public github repos. 
    The formal yet conversational tone will ensure the advice given is both professional and accessible, 
    specifically catering to the needs of SFRA developers.`;
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: instructions },
        { role: 'user', content: prompt },
      ],
      max_tokens: 100,
    });
    return response.choices[0].message.content;
  }
}
