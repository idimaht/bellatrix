import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { CreateDto } from '../backend/dtos/managers/create.dto';
import { UpdateDto } from '../backend/dtos/managers/update.dto';
import { ManagerEntity } from '../entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managersRepository: Repository<ManagerEntity>,
  ) {}

  async paginate(
    req: Request,
    options: IPaginationOptions,
  ): Promise<Pagination<ManagerEntity>> {
    const builder = this.managersRepository
      .createQueryBuilder('managers')
      .leftJoinAndSelect('managers.branch', 'branch');

    // order by ASC | DESC
    if (req.query.orderBy) {
      builder.orderBy('managers.id', `${req.query.orderBy}` as any);
    }

    // filter
    if (req.query.search)
      builder.where('managers.name, managers.address LIKE :search', {
        search: `%${req.query.search}%`,
      });

    return await paginate<ManagerEntity>(builder, options);
  }

  async findById(id: number): Promise<ManagerEntity> {
    const manager = await this.managersRepository.findOne({
      where: {
        id,
      },
    });

    if (!manager) {
      throw new NotFoundException();
    }

    return manager;
  }

  async create(dto: CreateDto): Promise<ManagerEntity> {
    const manager = this.managersRepository.create(dto);
    return await this.managersRepository.save(manager);
  }

  async update(id: number, dto: UpdateDto): Promise<ManagerEntity> {
    const manager = await this.findById(id);

    Object.assign(manager, dto);

    return await this.managersRepository.save(manager);
  }

  async delete(id: number): Promise<ManagerEntity> {
    const manager = await this.findById(id);

    return await this.managersRepository.softRemove(manager);
  }
}
