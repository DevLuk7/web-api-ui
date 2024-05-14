import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPEN_AI_SECRET_KEY'),
    });
  }

  async generatePost(description: string) {
    const chatCompletionsOptions = this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a blog post generator. You Generate blogpost from description. Generate format of blog post in HTML witch user can paste into website without tag html, head and body. Return response should be in JSON format with title property in string and content in HTML',
        },
        {
          role: 'system',
          content:
            'Add property to json object with key imagePrompt with value to generate image in dall e in 3 sentences',
        },
        { role: 'user', content: description },
      ],
    });

    const response = await chatCompletionsOptions;
    const responseMessage = JSON.parse(response.choices[0].message.content);

    return {
      title: responseMessage.title,
      content: responseMessage.content,
      imagePrompt: responseMessage.imagePrompt,
    };
  }

  async generateImagePost(description: string) {
    const options = this.openai.images.generate({
      prompt: `The image should be minimalist and cartoonish in style. Should doesn't have any text. The image should be related to the following text of blog post: ${description}`,
      style: 'vivid',
    });

    const response = await options;
    const responseMessage = response.data;
    return responseMessage;
  }
}
