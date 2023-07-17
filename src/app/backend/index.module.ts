import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { BranchEntity } from '../entities/branch.entity';
import { ManagerEntity } from '../entities/manager.entity';
import BranchesController from './controllers/branches';
import { BranchesService } from '../services/branches.service';
import { ManagersService } from '@services/managers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BranchEntity, ManagerEntity]),
  ],
  controllers: [...BranchesController],
  providers: [BranchesService, ManagersService],
  exports: [BranchesService],
})
export class HttpModule {}
