import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import UsersController from './controllers/users';
import { BranchEntity } from '../entities/branch.entity';
import { ManagerEntity } from '../entities/manager.entity';
import BranchesController from './controllers/branches';
import { BranchesService } from '../services/branches.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BranchEntity, ManagerEntity]),
  ],
  controllers: [...UsersController, ...BranchesController],
  providers: [UsersService, BranchesService],
})
export class HttpModule {}
