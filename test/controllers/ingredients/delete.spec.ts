import { DeleteController } from '@controllers/ingredients/delete.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsService } from '@services/ingredients.service';

describe('ingredients controller', () => {
  let controller: DeleteController;
  let service: Partial<IngredientsService>;

  beforeEach(async () => {
    service = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IngredientsService,
          useValue: service,
        },
      ],

      controllers: [DeleteController],
    }).compile();

    controller = module.get<DeleteController>(DeleteController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('delete', () => {
    it('should response 200 ok', async () => {
      const removeIngredient = await controller.delete(1);

      expect(removeIngredient.status.statusCode).toEqual(200);
      expect(removeIngredient.status.message).toBe('OK');
    });
  });

  describe('delete', () => {
    it('should throw an exception', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new Error('error'));

      try {
        await controller.delete(1);

        expect(controller.delete).toHaveBeenCalled();
      } catch (error) {
        return;
      }
    });
  });
});
