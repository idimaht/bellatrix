import { Controller, Get, Param } from '@nestjs/common';
import { ManagerEntity } from 'src/app/entities/manager.entity';
import { ManagersService } from 'src/app/services/managers.service';

@Controller({ path: 'managers' })
export class ShowController {
  constructor(private readonly managersService: ManagersService) {}
  // find one
  @Get(':id')
  async show(@Param('id') id: number): Promise<ManagerEntity> {
    return await this.managersService.findById(id);
  }
}
