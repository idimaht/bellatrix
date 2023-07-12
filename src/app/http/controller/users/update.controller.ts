import { UserEntity } from '../../../entities/user.entity';
import { UsersService } from '../../../services/users.service';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateDto } from '../../dtos/users/update.dto';

@Controller({ path: 'users' })
export class UpdateController {
  constructor(private readonly usersService: UsersService) {}
  //create user
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, dto);
  }
}
