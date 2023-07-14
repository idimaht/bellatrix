import { Controller, Delete, Param } from '@nestjs/common';
import { ApiResource } from '../../resources/api.resource';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { ManagersService } from 'src/app/services/managers.service';

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
