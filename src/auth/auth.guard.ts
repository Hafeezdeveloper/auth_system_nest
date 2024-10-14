// auth.guard.ts
import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { CUSTOMER, DOCTOR, OPERATOR, SUPER_ADMIN } from 'src/constant/app.constant';
import { Operator, OperatorDocument } from './schema/operator.schema';
import { Customer, CustomerDocument } from './schema/customer.schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectModel(Operator.name) private operatorModel: mongoose.Model<OperatorDocument>,
    @InjectModel(Customer.name) private customerModel: mongoose.Model<CustomerDocument>,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const collections = {
      [OPERATOR]: this.operatorModel,
      [SUPER_ADMIN]: this.operatorModel,
      [CUSTOMER]: this.customerModel,
      [DOCTOR]: this.customerModel,
    };

    const authHeader = request.headers.authorization;

    // If there's no token, allow access (for public APIs)
    if (!authHeader) {
      throw new UnauthorizedException('Token not provided');;
    }
    console.log(authHeader)
    // Decode the token and attach the user to the request
    try {
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload; // Type assertion here
      request.user = decodedToken;

      const users = await collections[decodedToken.userRole].findById(decodedToken.id)
      if (!users) {
        throw new UnauthorizedException('Invalid user role');
      }
      console.log("user second", users)
      // Fetch the user based on userId from the token

      // Attach the user to the request
      request['users'] = users;
      request['token'] = request.user;
      console.log("request",)
    } catch (err) {
      console.log("Invalid Token", err);
    }

    return await super.canActivate(context) as boolean;
  }
}
