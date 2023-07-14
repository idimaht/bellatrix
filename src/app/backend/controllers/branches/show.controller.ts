import { Controller, Get, Param } from '@nestjs/common';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { BranchesService } from 'src/app/services/branches.service';
import { ApiResource } from '../../resources/api.resource';

@Controller({ path: 'branches' })
export class ShowController {
  constructor(private readonly branchesService: BranchesService) {}
  // find one
  @Get(':id')
  async show(@Param('id') id: number): Promise<SuccessResponseType> {
    try {
      const data = await this.branchesService.findById(id);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
