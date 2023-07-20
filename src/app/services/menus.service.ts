import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { MenuEntity } from '@entities/menu.entity';
import { CreateDto } from '@backend/dtos/menus/create.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
  ) {}

  async paginate(
    req: Request,
    options: IPaginationOptions,
  ): Promise<Pagination<MenuEntity>> {
    const builder = this.menuRepository
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

    return await paginate<MenuEntity>(builder, options);
  }

  async findById(id: number): Promise<MenuEntity> {
    const menu = await this.menuRepository.findOne({
      where: {
        id,
      },
    });

    if (!menu) {
      throw new NotFoundException();
    }

    return menu;
  }

  async create(dto: CreateDto): Promise<MenuEntity> {
    const menu = this.menuRepository.create(dto);

    return await this.menuRepository.save(menu);
  }

  async update(id: number, dto: UpdateDto): Promise<MenuEntity> {
    const menu = await this.findById(id);

    Object.assign(menu, dto);

    return await this.menuRepository.save(menu);
  }

  async delete(id: number): Promise<MenuEntity> {
    const menu = await this.findById(id);

    return await this.menuRepository.softRemove(menu);
  }
}
