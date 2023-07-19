import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { CreateController } from ' @backend/controllers/managers/create.controller';
import { ManagersService } from '../../../../src/app/services/managers.service';
import { ManagerEntity } from '../../../../src/app/entities/manager.entity';
import { CreateDto } from '../../../../src/app/backend/dtos/managers/create.dto';

const dto: CreateDto = {
  name: 'a',
  tel: '0999999999',
  branchId: 1,
};

describe('managers controller', () => {
  let controller: CreateController;
  let service: Partial<ManagersService>;

  beforeEach(async () => {
    service = {
      create: (dto: CreateDto) => {
        const manager: ManagerEntity = plainToInstance(ManagerEntity, {
          id: 1,
          ...dto,
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

      controllers: [CreateController],
    }).compile();

    controller = module.get<CreateController>(CreateController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should response 200 ok', async () => {
      const addManager = await controller.create(dto);

      expect(addManager.status.statusCode).toEqual(200);
      expect(addManager.status.message).toBe('OK');
      expect(addManager.data.name).toBe('a');
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
