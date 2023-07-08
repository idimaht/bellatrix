import { Controller, Get, Param } from '@nestjs/common';
import { UserEntity } from 'src/app/entities/user.entity';
import { UsersService } from 'src/app/services/users.service';
@Controller({ path: 'users' })
export class FindOneController {
  constructor(private readonly userService: UsersService) {}
  // find one
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.findOne(id);
  }
}
