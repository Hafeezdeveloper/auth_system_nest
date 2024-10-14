import { Customer, CustomerDocument } from './../users/schema/users.schema';
// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dotenv from 'dotenv';
import { Operator, OperatorDocument } from './schema/operator.schema';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Customer.name) private userModel: Model<CustomerDocument>,
        @InjectModel(Operator.name) private operatorModel: Model<OperatorDocument>,
        private jwtService: JwtService,
    ) { }

    async validateUser(userName: string, password: string): Promise<any> {
        const user = await this.operatorModel.findOne({ userName: userName });
        console.log(user)

        return user;
    }

    async login(user: any) {
        console.log("Awdawd")
        const payload = { id: user._id, email: user.email, userRole: user.userRole };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
