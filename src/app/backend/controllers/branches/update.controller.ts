import { UpdateDto } from '@backend/dtos/branches/update.dto';
import { ApiResource } from '@backend/resources/api.resource';
import { UpdateResource } from '@backend/resources/branches/update/update.resource';
import { Serialize } from '@interceptors/resource.interceptor';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { BranchesService } from '@services/branches.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'branches' })
export class UpdateController {
  constructor(private readonly branchesService: BranchesService) {}

  @Patch(':id')
  @Serialize(UpdateResource)
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDto,
  ): Promise<SuccessResponseType> {
    try {
      const data = await this.branchesService.update(id, dto);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
