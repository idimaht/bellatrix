import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDto } from '../backend/dtos/users/create.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { UpdateDto } from '../backend/dtos/users/update.dto';

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

  async create(dto: CreateDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(dto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, dto: UpdateDto): Promise<UserEntity> {
    try {
      const user = await this.findById(id);

      Object.assign(user, dto);

      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const user = await this.findById(id);

      const deleteUser = await this.userRepository.delete(user);

      return deleteUser;
    } catch (error) {
      console.log(error);
    }
  }
}
