import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ManagersService } from 'src/app/services/managers.service';
import { UpdateDto } from '../../dtos/managers/update.dto';
import { ManagerEntity } from 'src/app/entities/manager.entity';

@Controller({ path: 'managers' })
export class UpdateController {
  constructor(private readonly managersService: ManagersService) {}
  //create user
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDto,
  ): Promise<ManagerEntity> {
    return this.managersService.update(id, dto);
  }
}
