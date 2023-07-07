import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  // change use dto in this
  async create(dto: UserEntity): Promise<UserEntity> {
    const user = this.usersRepository.create(dto);
    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
