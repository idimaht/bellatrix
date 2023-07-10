import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDto } from '../http/dtos/users/create.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async paginate(
    req: Request,
    options: IPaginationOptions,
  ): Promise<Pagination<UserEntity>> {
    const builder = this.userRepository.createQueryBuilder('users');

    // order by ASC | DESC
    if (req.query.orderBy) {
      builder.orderBy('users.id', `${req.query.orderBy}` as any);
    }

    // filter
    if (req.query.search)
      builder.where('users.name LIKE :search', {
        search: `%${req.query.search}%`,
      });

    return await paginate<UserEntity>(builder, options);
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // change use dto in this
  async create(dto: CreateDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(dto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      console.log('delete', id);

      const user = await this.findById(id);
      console.log('delete', user);

      const deleteUser = this.userRepository.softDelete(user);
      console.log('delete', deleteUser);

      return deleteUser;
    } catch (error) {
      console.log(error);
    }
  }
}
