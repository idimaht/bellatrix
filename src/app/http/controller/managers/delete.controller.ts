import { Controller, Delete, Param } from '@nestjs/common';
import { ManagerEntity } from 'src/app/entities/manager.entity';
import { ManagersService } from 'src/app/services/managers.service';

@Controller({ path: 'managers' })
export class DeleteController {
  constructor(private readonly managersService: ManagersService) {}

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ManagerEntity> {
    return this.managersService.delete(id);
  }
}
