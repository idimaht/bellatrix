import { ApiResource } from '@backend/resources/api.resource';
import { Controller, Get, Param } from '@nestjs/common';
import { MenusService } from '@services/menus.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'menus' })
export class ShowController {
  constructor(private readonly menusService: MenusService) {}

  @Get(':id')
  async show(@Param('id') id: number): Promise<SuccessResponseType> {
    try {
      const data = await this.menusService.findById(id);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
