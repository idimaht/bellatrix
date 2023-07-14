import { Controller, Delete, Param } from '@nestjs/common';
import { BranchesService } from 'src/app/services/branches.service';
import { ApiResource } from '../../resources/api.resource';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'branches' })
export class DeleteController {
  constructor(private readonly branchesService: BranchesService) {}

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<SuccessResponseType> {
    try {
      const data = await this.branchesService.delete(id);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
