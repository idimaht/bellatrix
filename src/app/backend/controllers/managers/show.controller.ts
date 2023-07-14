import { Controller, Get, Param } from '@nestjs/common';
import { SuccessResponseType } from 'src/app/responses/success-response.type';
import { ApiResource } from '../../resources/api.resource';
import { ManagersService } from 'src/app/services/managers.service';

@Controller({ path: 'managers' })
export class ShowController {
  constructor(private readonly managersService: ManagersService) {}
  // find one
  @Get(':id')
  async show(@Param('id') id: number): Promise<SuccessResponseType> {
    try {
      const data = await this.managersService.findById(id);

      return ApiResource.successResponse(data);
    } catch (error) {
      ApiResource.errorResponse(error);
    }
  }
}
