import { ApiResource } from '@backend/resources/api.resource';
import { Controller, Delete, Param } from '@nestjs/common';
import { IngredientsService } from '@services/ingredients.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'ingredients' })
export class DeleteController {
  constructor(private ingredientsService: IngredientsService) {}

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<SuccessResponseType> {
    try {
      const data = await this.ingredientsService.delete(id);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
