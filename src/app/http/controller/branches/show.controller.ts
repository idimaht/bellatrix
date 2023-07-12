import { Controller, Get, Param } from '@nestjs/common';
import { BranchEntity } from 'src/app/entities/branch.entity';
import { BranchesService } from 'src/app/services/branches.service';

@Controller({ path: 'branches' })
export class ShowController {
  constructor(private readonly branchesService: BranchesService) {}
  // find one
  @Get(':id')
  async show(@Param('id') id: number): Promise<BranchEntity> {
    return await this.branchesService.findById(id);
  }
}
