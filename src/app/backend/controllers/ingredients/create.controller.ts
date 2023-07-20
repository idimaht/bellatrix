import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from '@interceptors/resource.interceptor';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { ApiResource } from '@backend/resources/api.resource';
import { CreateResource } from '@backend/resources/ingredients/create/create.resource';
import { CreateDto } from '@backend/dtos/ingredients/create.dto';
import { IngredientsService } from '@services/ingredients.service';

@Controller({ path: 'ingredients' })
export class CreateController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @Serialize(CreateResource)
  async create(@Body() dto: CreateDto): Promise<SuccessResponseType> {
    try {
      const data = await this.ingredientsService.create(dto);
      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
