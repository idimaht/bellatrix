import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BulkOperationBase, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { BranchEntity } from '../entities/branch.entity';
import { CreateDto } from '../http/dtos/branches/create.dto';
import { UpdateDto } from '../http/dtos/branches/update.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(BranchEntity)
    private branchRepository: Repository<BranchEntity>,
  ) {}

  async paginate(
    req: Request,
    options: IPaginationOptions,
  ): Promise<Pagination<BranchEntity>> {
    const builder = this.branchRepository
      .createQueryBuilder('branches')
      .leftJoinAndSelect('branches.managers', 'managers');

    // order by ASC | DESC
    if (req.query.orderBy) {
      builder.orderBy('branches.id', `${req.query.orderBy}` as any);
    }

    // filter
    if (req.query.search)
      builder.where('branches.name LIKE :search', {
        search: `%${req.query.search}%`,
      });

    return await paginate<BranchEntity>(builder, options);
  }

  async findById(id: number): Promise<BranchEntity> {
    const branch = await this.branchRepository.findOne({
      where: {
        id,
      },
    });

    if (!branch) {
      throw new NotFoundException();
    }

    return branch;
  }

  async create(dto: CreateDto): Promise<BranchEntity> {
    try {
      const user = this.branchRepository.create(dto);
      return await this.branchRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, dto: UpdateDto): Promise<BranchEntity> {
    try {
      const branch = await this.findById(id);

      Object.assign(branch, dto);

      return await this.branchRepository.save(branch);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      console.log('delete', id);

      const branch = await this.findById(id);

      return await this.branchRepository.softDelete(branch);
    } catch (error) {
      console.log(error);
    }
  }
}