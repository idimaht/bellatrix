import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from '@interceptors/resource.interceptor';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { ApiResource } from '@backend/resources/api.resource';
import { CreateResource } from '@backend/resources/menus/create/create.resource';
import { CreateDto } from '@backend/dtos/menus/create.dto';
import { MenusService } from '@services/menus.service';

@Controller({ path: 'menus' })
export class CreateController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @Serialize(CreateResource)
  async create(@Body() dto: CreateDto): Promise<SuccessResponseType> {
    try {
      const data = await this.menusService.create(dto);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
