import { UpdateDto } from '@backend/dtos/menus/update.dto';
import { ApiResource } from '@backend/resources/api.resource';
import { UpdateResource } from '@backend/resources/ingredients/update/update.resource';
import { Serialize } from '@interceptors/resource.interceptor';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { MenusService } from '@services/menus.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'menus' })
export class UpdateController {
  constructor(private readonly menusService: MenusService) {}

  @Patch(':id')
  @Serialize(UpdateResource)
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDto,
  ): Promise<SuccessResponseType> {
    try {
      const data = await this.menusService.update(id, dto);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
