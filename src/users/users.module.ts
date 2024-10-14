import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Customer, CustomerSchema } from 'src/auth/schema/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]), // Register User model
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, MongooseModule], // Export MongooseModule and UsersService
  // Export MongooseModule to make the model available in other modules
})
export class UsersModule { }
