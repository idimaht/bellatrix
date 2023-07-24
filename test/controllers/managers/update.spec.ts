import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { UpdateDto } from '@dtos/managers/update.dto';
import { ManagersService } from '@services/managers.service';
import { ManagerEntity } from '@entities/manager.entity';
import { UpdateController } from '@controllers/managers/update.controller';

const dto: UpdateDto = {
  name: 'b',
  tel: '0999999999',
  branchId: 1,
};

describe('branches controller', () => {
  let controller: UpdateController;
  let service: Partial<ManagersService>;

  beforeEach(async () => {
    service = {
      update: () => {
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

      controllers: [UpdateController],
    }).compile();

    controller = module.get<UpdateController>(UpdateController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('update', () => {
    it('should response 200 ok', async () => {
      const editBranch = await controller.update(1, dto);
      console.log(editBranch);

      expect(editBranch.status.statusCode).toEqual(200);
      expect(editBranch.status.message).toBe('OK');
      expect(editBranch.data.name).toBe('b');
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
