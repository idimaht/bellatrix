import { Controller, Get } from '@nestjs/common';
import { UserEntity } from 'src/app/entities/user.entity';
import { UsersService } from 'src/app/services/users.service';

@Controller({ path: 'users' })
export class FindAllController {
  constructor(private readonly usersService: UsersService) {}
  // find all user
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
}
