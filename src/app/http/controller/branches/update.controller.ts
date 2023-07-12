import { Body, Controller, Param, Patch } from '@nestjs/common';
import { BranchesService } from 'src/app/services/branches.service';
import { UpdateDto } from '../../dtos/branches/update.dto';
import { BranchEntity } from 'src/app/entities/branch.entity';

@Controller({ path: 'branches' })
export class UpdateController {
  constructor(private readonly branchesService: BranchesService) {}
  //create user
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDto,
  ): Promise<BranchEntity> {
    return this.branchesService.update(id, dto);
  }
}
