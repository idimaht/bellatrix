import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { MenuEntity } from '@entities/menu.entity';
import { CreateDto } from '@backend/dtos/menus/create.dto';
import { IngredientMenuService } from './ingredient-menu';
import { UpdateDto } from '@backend/dtos/menus/update.dto';
import { get, omit } from 'lodash';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly ingredientMenuService: IngredientMenuService,
  ) {}

  async paginate(
    req: Request,
    options: IPaginationOptions,
  ): Promise<Pagination<MenuEntity>> {
    const builder = this.menuRepository
      .createQueryBuilder('menus')
      .leftJoinAndSelect('menus.ingredients', 'ingredients');

    // order by ASC | DESC
    if (req.query.orderBy) {
      builder.orderBy('menus.id', `${req.query.orderBy}` as any);
    }

    // filter
    if (req.query.search)
      builder.where('menus.name LIKE :search', {
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const createDto = omit(dto, ['ingredients']);

      const createMenu = this.menuRepository.create(createDto);

      const menus = await queryRunner.manager.save(createMenu);

      if (dto.ingredientId) {
        await this.ingredientMenuService.attach(
          get(dto, 'ingredientId', []),
          menus,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      return menus;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      const errorStatusCode = get(error.response, 'errorStatusCode');

      if (errorStatusCode === 404) {
        throw error;
      }

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot Create',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
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
