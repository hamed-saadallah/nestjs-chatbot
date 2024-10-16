import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}
  @Get()
  findAll() {
    return 'Hello World!!!!';
  }
  @Post('ask')
  async ask(@Body('prompt') prompt: string): Promise<string> {
    const response = await this.chatbotService.getChatResponse(prompt);
    return response;
  }
}
