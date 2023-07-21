import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { IngredientEntity } from '@entities/ingredient.entity';
import { CreateDto } from '@backend/dtos/ingredients/create.dto';
import { UpdateDto } from '@backend/dtos/ingredients/update.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(IngredientEntity)
    private ingredientRepository: Repository<IngredientEntity>,
  ) {}

  async paginate(
    req: Request,
    options: IPaginationOptions,
  ): Promise<Pagination<IngredientEntity>> {
    const builder = this.ingredientRepository
      .createQueryBuilder('ingredients')
      .leftJoinAndSelect('ingredients.menus', 'menus');

    // order by ASC | DESC
    if (req.query.orderBy) {
      builder.orderBy('ingredients.id', `${req.query.orderBy}` as any);
    }

    // filter
    if (req.query.search)
      builder.where('ingredients.name LIKE :search', {
        search: `%${req.query.search}%`,
      });

    return await paginate<IngredientEntity>(builder, options);
  }

  async findById(id: number): Promise<IngredientEntity> {
    const ingredient = await this.ingredientRepository.findOne({
      where: {
        id,
      },
    });

    if (!ingredient) {
      throw new NotFoundException();
    }

    return ingredient;
  }

  async getByIds(ids: number[]): Promise<IngredientEntity[]> {
    return await this.ingredientRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async create(dto: CreateDto): Promise<IngredientEntity> {
    const ingredient = this.ingredientRepository.create(dto);

    return await this.ingredientRepository.save(ingredient);
  }

  async update(id: number, dto: UpdateDto): Promise<IngredientEntity> {
    const ingredient = await this.findById(id);

    Object.assign(ingredient, dto);

    return await this.ingredientRepository.save(ingredient);
  }

  async delete(id: number): Promise<IngredientEntity> {
    const ingredient = await this.findById(id);

    return await this.ingredientRepository.softRemove(ingredient);
  }
}
