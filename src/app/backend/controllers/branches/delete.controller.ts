import { ApiResource } from '@backend/resources/api.resource';
import { Controller, Delete, Param } from '@nestjs/common';
import { BranchesService } from '@services/branches.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'branches' })
export class DeleteController {
  constructor(private branchesService: BranchesService) {}

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
