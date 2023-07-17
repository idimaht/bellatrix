import { CreateDto } from '@backend/dtos/managers/create.dto';
import { ApiResource } from '@backend/resources/api.resource';
import { CreateResource } from '@backend/resources/managers/create/create.resource';
import { Serialize } from '@interceptors/resource.interceptor';
import { Body, Controller, Post } from '@nestjs/common';
import { ManagersService } from '@services/managers.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

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
