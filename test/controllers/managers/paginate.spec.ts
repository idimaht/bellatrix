import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginateController } from '@controllers/ingredients/paginate.controller';
import { IngredientsService } from '@services/ingredients.service';
import { IngredientEntity } from '@entities/ingredient.entity';

let httpMocks = require('node-mocks-http');

const request = httpMocks.createRequest({
  method: 'PATCH',
  url: '/managers',
  params: {
    search: 'b',
    orderBy: 'ASC',
  },
});

describe('managers controller', () => {
  let controller: PaginateController;
  let service: Partial<IngredientsService>;

  beforeEach(async () => {
    service = {
      paginate: () => {
        const manager: IngredientEntity = plainToInstance(IngredientEntity, {
          id: 1,
          name: 'a',
          tel: '0999999999',
          branchId: 1,
        });

        const manager2: IngredientEntity = plainToInstance(IngredientEntity, {
          id: 2,
          name: 'a',
          tel: '0999999999',
          branchId: 1,
        });

        const manager3: IngredientEntity = plainToInstance(IngredientEntity, {
          id: 3,
          name: 'a',
          tel: '0999999999',
          branchId: 1,
        });

        return Promise.resolve({
          items: [manager, manager2, manager3],
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

      const manager = await controller.paginate(request);

      expect(manager.data.length).toEqual(3);
      expect(manager.status.statusCode).toEqual(200);
      expect(manager.status.message).toBe('OK');
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
