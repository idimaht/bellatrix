import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import UserController from './controller/users';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [...UserController],
  providers: [UsersService],
})
export class HttpModule {}
