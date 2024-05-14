import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Newsletter {
  @ApiProperty()
  @Prop()
  email: string;
}

export type NewsletterDocument = HydratedDocument<Newsletter>;

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);

export class SubscribeDto {
  @ApiProperty()
  email: string;
}
