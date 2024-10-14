import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({
    timestamps: true
})
export class Operator extends Document {
    subject(email: string, subject: any, message: (email: string, subject: any, message: any) => void) {
        throw new Error('Method not implemented.');
    }
    message(email: string, subject: any, message: any) {
        throw new Error('Method not implemented.');
    }


    @Prop()
    userName: string;

    @Prop({ unique: [true, 'Duplicate email entered '] })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({})
    userRole: string;


}

export const OperatorSchema = SchemaFactory.createForClass(Operator);

export type OperatorDocument = Operator & Document;