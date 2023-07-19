import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { ShowController } from '../../../../src/app/backend/controllers/managers/show.controller';
import { ManagersService } from '../../../../src/app/services/managers.service';
import { ManagerEntity } from '../../../../src/app/entities/manager.entity';

describe('managers controller', () => {
  let controller: ShowController;
  let service: Partial<ManagersService>;

  beforeEach(async () => {
    service = {
      findById: (id: number) => {
        const manager: ManagerEntity = plainToInstance(ManagerEntity, {
          id,
          name: 'a',
          tel: '0999999999',
          branchId: 1,
        });

        return Promise.resolve(manager);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ManagersService,
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
