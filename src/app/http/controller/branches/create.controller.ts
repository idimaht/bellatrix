import { Body, Controller, Post } from '@nestjs/common';
import { BranchesService } from 'src/app/services/branches.service';
import { CreateDto } from '../../dtos/branches/create.dto';
import { BranchEntity } from 'src/app/entities/branch.entity';

@Controller({ path: 'branches' })
export class CreateController {
  constructor(private readonly branchesService: BranchesService) {}
  //create user
  @Post()
  async create(@Body() dto: CreateDto): Promise<BranchEntity> {
    return this.branchesService.create(dto);
  }
}
