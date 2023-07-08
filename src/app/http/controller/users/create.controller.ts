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
