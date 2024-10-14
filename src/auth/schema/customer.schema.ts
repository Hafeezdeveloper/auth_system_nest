import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum AccountStatus {
    ACTIVE = "approved",
    PENDING = "pending",

}

@Schema({ timestamps: true })
export class Customer extends Document {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;
 }

export const CustomerSchema = SchemaFactory.createForClass(Customer);

export type CustomerDocument = Customer & Document;

///////////////// previous side ==> Change on  ==> module4
@Schema({ timestamps: true })
export class Profile extends Document {

    @Prop({ default: null })
    coverPhoto: string;

    @Prop({ default: null })
    backgroundPicture: string;

    @Prop({ default: null })
    isCoverPhoto: string;

    @Prop({ type: "ObjectId", ref: 'Customer', default: null })
    customerId: string;  // Reference to the Customer schema

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

export type ProfileDocument = Profile & Document;
