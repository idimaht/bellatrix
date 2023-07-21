import { ApiResource } from '@backend/resources/api.resource';
import { Controller, Delete, Param } from '@nestjs/common';
import { MenusService } from '@services/menus.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'menus' })
export class DeleteController {
  constructor(private menusService: MenusService) {}

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<SuccessResponseType> {
    try {
      const data = await this.menusService.delete(id);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
