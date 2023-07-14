import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateDto } from '../../dtos/branches/update.dto';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { ApiResource } from '../../resources/api.resource';
import { ManagersService } from 'src/app/services/managers.service';
import { Serialize } from 'src/app/interceptors/resource.interceptor';
import { UpdateResource } from '../../resources/managers/update/update.resource';

@Controller({ path: 'managers' })
export class UpdateController {
  constructor(private readonly managersService: ManagersService) {}

  @Patch(':id')
  @Serialize(UpdateResource)
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDto,
  ): Promise<SuccessResponseType> {
    try {
      const data = this.managersService.update(id, dto);
      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
