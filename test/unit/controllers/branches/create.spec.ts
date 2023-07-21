import { Test, TestingModule } from '@nestjs/testing';
import { CreateController } from '../../../../src/app/backend/controllers/branches/create.controller';
import { BranchesService } from '../../../../src/app/services/branches.service';
import { CreateDto } from '../../../../src/app/backend/dtos/branches/create.dto';
import { BranchEntity } from '../../../../src/app/entities/branch.entity';
import { plainToInstance } from 'class-transformer';

const dto: CreateDto = {
  name: 'a',
  tel: '0999999999',
  address: 'bangkok, thailand',
};

describe('branches controller', () => {
  let controller: CreateController;
  let service: Partial<BranchesService>;

  beforeEach(async () => {
    service = {
      create: (dto: CreateDto) => {
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
      const addBranch = await controller.create(dto);

      expect(addBranch.status.statusCode).toEqual(200);
      expect(addBranch.status.message).toBe('OK');
      expect(addBranch.data.name).toBe('a');
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
