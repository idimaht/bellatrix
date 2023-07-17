import { ApiResource } from '@backend/resources/api.resource';
import { Controller, Get, Param } from '@nestjs/common';
import { ManagersService } from '@services/managers.service';
import { SuccessResponseType } from 'src/app/responses/success-response.type';

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
