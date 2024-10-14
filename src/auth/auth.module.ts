// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schema/customer.schema';
import { Operator, OperatorSchema } from './schema/operator.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use environment variable in production
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule, // Import UsersModule to access the UserModel
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Operator.name, schema: OperatorSchema },
    ]),
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
