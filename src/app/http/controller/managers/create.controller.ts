import { Body, Controller, Post } from '@nestjs/common';
import { ManagersService } from 'src/app/services/managers.service';
import { ManagerEntity } from 'src/app/entities/manager.entity';
import { CreateDto } from '../../dtos/managers/create.dto';

@Controller({ path: 'managers' })
export class CreateController {
  constructor(private readonly managersService: ManagersService) {}
  //create user
  @Post()
  async create(@Body() dto: CreateDto): Promise<ManagerEntity> {
    return this.managersService.create(dto);
  }
}
