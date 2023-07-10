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
import { UserEntity } from 'src/app/entities/user.entity';
import { UsersService } from 'src/app/services/users.service';

@Controller({ path: 'users' })
export class PaginateController {
  constructor(private readonly usersService: UsersService) {}
  // find all user
  @Get()
  async paginate(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 1,
  ): Promise<Pagination<UserEntity>> {
    const options: IPaginationOptions = {
      page,
      limit,
    };

    return await this.usersService.paginate(req, options);
  }
}
