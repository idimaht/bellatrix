import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ManagerEntity } from 'src/app/entities/manager.entity';
import { ManagersService } from 'src/app/services/managers.service';

@Controller({ path: 'managers' })
export class PaginateController {
  constructor(private readonly managersService: ManagersService) {}
  // find all user
  @Get()
  async paginate(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 1,
  ): Promise<Pagination<ManagerEntity>> {
    const options: IPaginationOptions = {
      page,
      limit,
    };

    return await this.managersService.paginate(req, options);
  }
}
