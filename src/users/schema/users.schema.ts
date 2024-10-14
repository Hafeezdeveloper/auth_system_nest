// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;
@Schema()
export class Customer {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
