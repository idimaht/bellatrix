import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { BranchesService } from 'src/app/services/branches.service';
import { BranchEntity } from 'src/app/entities/branch.entity';

@Controller({ path: 'branches' })
export class DeleteController {
  constructor(private readonly branchesService: BranchesService) {}

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<BranchEntity> {
    try {
      return this.branchesService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'BRANCH_DELETE_ERROR',
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }
}
