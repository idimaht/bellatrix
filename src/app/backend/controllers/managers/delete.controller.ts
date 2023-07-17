import { ApiResource } from '@backend/resources/api.resource';
import { Controller, Delete, Param } from '@nestjs/common';
import { ManagersService } from '@services/managers.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

@Controller({ path: 'managers' })
export class DeleteController {
  constructor(private readonly managersService: ManagersService) {}

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<SuccessResponseType> {
    try {
      const data = await this.managersService.delete(id);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
