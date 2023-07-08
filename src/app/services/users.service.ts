import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDto } from '../http/dtos/users/create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  // change use dto in this
  async create(dto: CreateDto): Promise<UserEntity> {
    const user = this.usersRepository.create(dto);
    console.log('service: ', dto);
    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<any> {
    const user = +this.findOne(id);

    await this.usersRepository.softDelete(user);
  }
}
