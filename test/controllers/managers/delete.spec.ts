import { Test, TestingModule } from '@nestjs/testing';
import { DeleteController } from '@controllers/managers/delete.controller';
import { ManagersService } from '@services/managers.service';

describe('managers controller', () => {
  let controller: DeleteController;
  let service: Partial<ManagersService>;

  beforeEach(async () => {
    service = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ManagersService,
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
      const removeManager = await controller.delete(1);

      expect(removeManager.status.statusCode).toEqual(200);
      expect(removeManager.status.message).toBe('OK');
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
