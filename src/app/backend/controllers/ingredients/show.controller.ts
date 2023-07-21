import { ApiResource } from '@backend/resources/api.resource';
import { Controller, Get, Param } from '@nestjs/common';
import { BranchesService } from '@services/branches.service';
import { IngredientsService } from '@services/ingredients.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'ingredients' })
export class ShowController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get(':id')
  async show(@Param('id') id: number): Promise<SuccessResponseType> {
    try {
      const data = await this.ingredientsService.findById(id);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
