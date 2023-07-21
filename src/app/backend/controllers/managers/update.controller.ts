import { UpdateDto } from '@backend/dtos/managers/update.dto';
import { ApiResource } from '@backend/resources/api.resource';
import { Serialize } from '@interceptors/resource.interceptor';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ManagersService } from '@services/managers.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { UpdateResource } from '@backend/resources/managers/update/update.resource';

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
      const data = await this.managersService.update(id, dto);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
