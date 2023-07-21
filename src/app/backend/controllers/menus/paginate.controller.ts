import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ApiResource } from '@backend/resources/api.resource';
import { Request } from 'express';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { Serialize } from '@interceptors/resource.interceptor';
import { MenusService } from '@services/menus.service';
import { PaginateResource } from '@backend/resources/menus/paginate/paginate.resource';

@Controller({ path: 'menus' })
export class PaginateController {
  constructor(private menusService: MenusService) {}

  @Get()
  @Serialize(PaginateResource)
  async paginate(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 1,
  ): Promise<SuccessResponseType> {
    try {
      const options: IPaginationOptions = {
        page,
        limit,
      };

      const data = await this.menusService.paginate(req, options);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
