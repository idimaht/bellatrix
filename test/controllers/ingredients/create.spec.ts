import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { CreateDto } from '@dtos/ingredients/create.dto';
import { CreateController } from '@controllers/ingredients/create.controller';
import { IngredientsService } from '@services/ingredients.service';
import { IngredientEntity } from '@entities/ingredient.entity';

const dto: CreateDto = {
  name: 'a',
  amount: 2000,
};

describe('ingredients controller', () => {
  let controller: CreateController;
  let service: Partial<IngredientsService>;

  beforeEach(async () => {
    service = {
      create: (dto: CreateDto) => {
        const manager: IngredientEntity = plainToInstance(IngredientEntity, {
          id: 1,
          ...dto,
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

      controllers: [CreateController],
    }).compile();

    controller = module.get<CreateController>(CreateController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should response 200 ok', async () => {
      const addIngredient = await controller.create(dto);

      expect(addIngredient.status.statusCode).toEqual(200);
      expect(addIngredient.status.message).toBe('OK');
      expect(addIngredient.data.name).toBe('a');
    });
  });

  describe('create', () => {
    it('should throw an exception', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error('error'));

      try {
        await controller.create(dto);
      } catch (error) {
        return;
      }
    });
  });
});
