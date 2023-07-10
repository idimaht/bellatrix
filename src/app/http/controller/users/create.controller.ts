import { UserEntity } from '../../../entities/user.entity';
import { UsersService } from '../../../services/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateDto } from '../../dtos/users/create.dto';

@Controller({ path: 'users' })
export class CreateController {
  constructor(private readonly usersService: UsersService) {}
  //create user
  @Post()
  async create(@Body() dto: CreateDto): Promise<UserEntity> {
    console.log('create controller user', dto);

    return this.usersService.create(dto);
  }
}
