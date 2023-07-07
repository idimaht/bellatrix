import path from 'path';
import { UserEntity } from '../../../entities/user.entity';
import { UsersService } from '../../../services/users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller({ path: 'users' })
export class CreateController {
  constructor(private readonly usersService: UsersService) {}

  //create user
  @Post()
  async create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.usersService.create(user);
  }

  // //get all users
  // @Get()
  // async findAll(): Promise<UserEntity[]> {
  //   return this.usersService.findAll();
  // }

  // //get user by id
  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<UserEntity> {
  //   const user = await this.usersService.findById(id);
  //   if (!user) {
  //     throw new NotFoundException('User does not exist!');
  //   } else {
  //     return user;
  //   }
  // }

  // //delete user
  // @Delete(':id')
  // async delete(@Param('id') id: number): Promise<any> {
  //   //handle error if user does not exist
  //   const user = await this.usersService.findById(id);
  //   if (!user) {
  //     throw new NotFoundException('User does not exist!');
  //   }
  //   return this.usersService.delete(id);
  // }
}
