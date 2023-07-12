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
import { BranchEntity } from 'src/app/entities/branch.entity';
import { BranchesService } from 'src/app/services/branches.service';

@Controller({ path: 'branches' })
export class PaginateController {
  constructor(private readonly branchesService: BranchesService) {}
  // find all user
  @Get()
  async paginate(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 1,
  ): Promise<Pagination<BranchEntity>> {
    const options: IPaginationOptions = {
      page,
      limit,
    };

    return await this.branchesService.paginate(req, options);
  }
}
