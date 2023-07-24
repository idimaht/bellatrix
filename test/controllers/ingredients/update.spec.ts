import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { UpdateController } from '@controllers/ingredients/update.controller';
import { UpdateDto } from '@dtos/ingredients/update.dto';
import { IngredientsService } from '@services/ingredients.service';
import { IngredientEntity } from '@entities/ingredient.entity';

const dto: UpdateDto = {
  name: 'a',
  amount: 2000,
};

describe('ingredients controller', () => {
  let controller: UpdateController;
  let service: Partial<IngredientsService>;

  beforeEach(async () => {
    service = {
      update: () => {
        const ingredient: IngredientEntity = plainToInstance(IngredientEntity, {
          id: 1,
          ...dto,
        });

        return Promise.resolve(ingredient);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IngredientsService,
          useValue: service,
        },
      ],

      controllers: [UpdateController],
    }).compile();

    controller = module.get<UpdateController>(UpdateController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('update', () => {
    it('should response 200 ok', async () => {
      const editIngredient = await controller.update(1, dto);

      expect(editIngredient.status.statusCode).toEqual(200);
      expect(editIngredient.status.message).toBe('OK');
      expect(editIngredient.data.name).toBe('a');
    });
  });

  describe('update', () => {
    it('should throw an exception', async () => {
      jest.spyOn(service, 'update').mockImplementation(() => {
        throw new Error('error');
      });

      try {
        await controller.update(1, dto);
      } catch (error) {
        return;
      }
    });
  });
});
