import { NestFactory } from '@nestjs/core';
import { ChatbotModule } from './chatbot/chatbot.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatbotModule);
  await app.listen(3000);
}
bootstrap();
