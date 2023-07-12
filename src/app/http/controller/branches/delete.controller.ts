import { Controller, Delete, Param } from '@nestjs/common';
import { BranchesService } from 'src/app/services/branches.service';
import { BranchEntity } from 'src/app/entities/branch.entity';

@Controller({ path: 'branches' })
export class DeleteController {
  constructor(private readonly branchesService: BranchesService) {}

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<BranchEntity> {
    return this.branchesService.delete(id);
  }
}
