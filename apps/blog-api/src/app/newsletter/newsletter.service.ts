import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Newsletter } from './newsletter.schema';

@Injectable()
export class NewsletterService {
  constructor(@InjectModel(Newsletter.name) private newslatterModel: Model<Newsletter>) {}

  async subscribe(email: string) {
    const createdNewsletter = new this.newslatterModel({ email });
    return createdNewsletter.save();
  }
}
