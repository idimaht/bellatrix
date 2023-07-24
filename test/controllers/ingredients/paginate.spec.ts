import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginateController } from '@controllers/ingredients/paginate.controller';
import { IngredientsService } from '@services/ingredients.service';
import { IngredientEntity } from '@entities/ingredient.entity';

let httpMocks = require('node-mocks-http');

const request = httpMocks.createRequest({
  method: 'PATCH',
  url: '/ingredients',
  params: {
    search: 'b',
    orderBy: 'ASC',
  },
});

describe('ingredients controller', () => {
  let controller: PaginateController;
  let service: Partial<IngredientsService>;

  beforeEach(async () => {
    service = {
      paginate: () => {
        const ingredient: IngredientEntity = plainToInstance(IngredientEntity, {
          id: 1,
          name: 'a',
          amount: 2000,
        });

        const ingredient2: IngredientEntity = plainToInstance(
          IngredientEntity,
          {
            id: 2,
            name: 'ar',
            amount: 2000,
          },
        );

        const ingredient3: IngredientEntity = plainToInstance(
          IngredientEntity,
          {
            id: 3,
            name: 'ad',
            amount: 2000,
          },
        );

        return Promise.resolve({
          items: [ingredient, ingredient2, ingredient3],
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
          },
          links: {},
        } as Pagination<IngredientEntity>);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IngredientsService,
          useValue: service,
        },
      ],

      controllers: [PaginateController],
    }).compile();

    controller = module.get<PaginateController>(PaginateController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('paginate', () => {
    it('should response 200 ok', async () => {
      jest.spyOn(service, 'paginate');

      const ingredient = await controller.paginate(request);

      expect(ingredient.data.length).toEqual(3);
      expect(ingredient.status.statusCode).toEqual(200);
      expect(ingredient.status.message).toBe('OK');
    });
  });

  describe('paginate', () => {
    it('should throw an exception', async () => {
      jest.spyOn(service, 'paginate').mockRejectedValue(new Error('error'));

      try {
        await controller.paginate(request);
      } catch (error) {
        return;
      }
    });
  });
});
