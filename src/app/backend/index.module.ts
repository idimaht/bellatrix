import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { BranchEntity } from '../entities/branch.entity';
import { ManagerEntity } from '../entities/manager.entity';
import BranchesController from './controllers/branches';
import { BranchesService } from '../services/branches.service';
import { ManagersService } from '@services/managers.service';
import ManagersController from './controllers/managers';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BranchEntity, ManagerEntity]),
  ],
  controllers: [...BranchesController, ...ManagersController],
  providers: [BranchesService, ManagersService],
  exports: [BranchesService, ManagersService],
})
export class BackendModule {}
