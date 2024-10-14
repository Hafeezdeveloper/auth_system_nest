// user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Customer, CustomerDocument } from 'src/auth/schema/customer.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Customer.name) private userModel: Model<CustomerDocument>) { }

    async create(username: string, password: string): Promise<Customer> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({
            username,
            password: hashedPassword,
        });
        return createdUser.save();
    }


}
