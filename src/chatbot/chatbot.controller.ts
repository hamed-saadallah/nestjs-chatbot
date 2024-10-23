import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { CreateChatDto } from './dto/createChatDto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}
  @Post('ask')
  /**
   * Send a question to the chatbot and return the response. The question and
   * answer are stored in the database.
   *
   * @param prompt The question to ask the chatbot.
   * @returns The response from the chatbot.
   */
  async ask(
    @Body('prompt') prompt: string,
    @Request() req: Request,
  ): Promise<string> {
    const response = await this.chatbotService.getChatResponse(prompt);
    const chatDto = new CreateChatDto();
    chatDto.userId = req['user'].userId;
    chatDto.question = prompt;
    chatDto.answer = response;
    chatDto.createdAt = new Date();
    this.chatbotService.create(chatDto);
    return response;
  }

  @Post('create')
  create(@Body() chatDto: CreateChatDto) {
    return this.chatbotService.create(chatDto);
  }

  @Get()
  findAll() {
    return this.chatbotService.findAll();
  }
}
