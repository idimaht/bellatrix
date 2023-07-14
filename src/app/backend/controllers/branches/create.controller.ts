import { CreateResource } from './../../resources/branches/create/create.resource';
import { Body, Controller, Post } from '@nestjs/common';
import { BranchesService } from 'src/app/services/branches.service';
import { CreateDto } from '../../dtos/branches/create.dto';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { ApiResource } from '../../resources/api.resource';
import { Serialize } from '../../../interceptors/resource.interceptor';

@Controller({ path: 'branches' })
export class CreateController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @Serialize(CreateResource)
  async create(@Body() dto: CreateDto): Promise<SuccessResponseType> {
    try {
      const data = await this.branchesService.create(dto);
      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
