import { Body, Controller, Param, Patch } from '@nestjs/common';
import { BranchesService } from 'src/app/services/branches.service';
import { UpdateDto } from '../../dtos/branches/update.dto';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { ApiResource } from '../../resources/api.resource';
import { Serialize } from 'src/app/interceptors/resource.interceptor';
import { UpdateResource } from '../../resources/branches/update/update.resource';

@Controller({ path: 'branches' })
export class UpdateController {
  constructor(private readonly branchesService: BranchesService) {}
  //create user
  @Patch(':id')
  @Serialize(UpdateResource)
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDto,
  ): Promise<SuccessResponseType> {
    try {
      const data = this.branchesService.update(id, dto);
      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
