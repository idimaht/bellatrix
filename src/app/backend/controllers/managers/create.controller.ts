import { CreateResource } from '../../resources/branches/create/create.resource';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateDto } from '../../dtos/managers/create.dto';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { ApiResource } from '../../resources/api.resource';
import { Serialize } from '../../../interceptors/resource.interceptor';
import { ManagersService } from 'src/app/services/managers.service';

@Controller({ path: 'managers' })
export class CreateController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  @Serialize(CreateResource)
  async create(@Body() dto: CreateDto): Promise<SuccessResponseType> {
    try {
      const data = await this.managersService.create(dto);
      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
