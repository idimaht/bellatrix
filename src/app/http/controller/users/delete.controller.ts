import { UsersService } from 'src/app/services/users.service';
import { Controller, Delete, Param } from '@nestjs/common';
import { UserEntity } from 'src/app/entities/user.entity';

@Controller({ path: 'users' })
export class DeleteController {
  constructor(private readonly usersService: UsersService) {}

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.delete(id);
  }
}
