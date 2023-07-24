import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { ShowController } from '@controllers/ingredients/show.controller';
import { IngredientsService } from '@services/ingredients.service';
import { IngredientEntity } from '@entities/ingredient.entity';

describe('ingredient controller', () => {
  let controller: ShowController;
  let service: Partial<IngredientsService>;

  beforeEach(async () => {
    service = {
      findById: (id: number) => {
        const manager: IngredientEntity = plainToInstance(IngredientEntity, {
          id,
          name: 'a',
          amount: 2000,
        });

        return Promise.resolve(manager);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IngredientsService,
          useValue: service,
        },
      ],

      controllers: [ShowController],
    }).compile();

    controller = module.get<ShowController>(ShowController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('show', () => {
    it('should response 200 ok', async () => {
      const showManager = await controller.show(1);

      expect(showManager.status.statusCode).toEqual(200);
      expect(showManager.status.message).toBe('OK');
      expect(showManager.data.name).toBe('a');
    });
  });

  describe('show', () => {
    it('should throw an exception', async () => {
      jest.spyOn(service, 'findById').mockRejectedValue(new Error('error'));

      try {
        await controller.show(1);
      } catch (error) {
        return;
      }
    });
  });
});
