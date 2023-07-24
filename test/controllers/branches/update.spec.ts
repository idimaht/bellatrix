import { Test, TestingModule } from '@nestjs/testing';
import { BranchesService } from '@services/branches.service';
import { BranchEntity } from '@entities/branch.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateDto } from '@dtos/branches/update.dto';
import { UpdateController } from '@controllers/branches/update.controller';

const dto: UpdateDto = {
  name: 'b',
  tel: '0999999999',
  address: 'bangkok, thailand',
};

describe('branches controller', () => {
  let controller: UpdateController;
  let fakeService: Partial<BranchesService>;

  beforeEach(async () => {
    fakeService = {
      update: () => {
        const branch: BranchEntity = plainToInstance(BranchEntity, {
          id: 1,
          ...dto,
        });

        return Promise.resolve(branch);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BranchesService,
          useValue: fakeService,
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
      const addBranch = await controller.update(1, dto);

      expect(addBranch.status.statusCode).toEqual(200);
      expect(addBranch.status.message).toBe('OK');
      expect(addBranch.data.name).toBe('b');
    });
  });

  describe('update', () => {
    it('should throw an exception', async () => {
      jest.spyOn(fakeService, 'update').mockRejectedValue(new Error('error'));

      try {
        await controller.update(1, dto);
      } catch (error) {
        return;
      }
    });
  });
});
