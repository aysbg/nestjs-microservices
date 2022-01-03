import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    }),
  )
  details: Record<string, any>;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
