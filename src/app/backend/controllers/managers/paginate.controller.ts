import { ApiResource } from '@backend/resources/api.resource';
import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { ManagersService } from '@services/managers.service';
import { Request } from 'express';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'managers' })
export class PaginateController {
  constructor(private readonly managersService: ManagersService) {}

  @Get()
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

      const data = await this.managersService.paginate(req, options);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
