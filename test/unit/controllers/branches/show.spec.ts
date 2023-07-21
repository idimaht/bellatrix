import { Test, TestingModule } from '@nestjs/testing';
import { BranchesService } from '../../../../src/app/services/branches.service';
import { BranchEntity } from '../../../../src/app/entities/branch.entity';
import { plainToInstance } from 'class-transformer';
import { ShowController } from '../../../../src/app/backend/controllers/branches/show.controller';

describe('branches controller', () => {
  let controller: ShowController;
  let service: Partial<BranchesService>;

  beforeEach(async () => {
    service = {
      findById: (id: number) => {
        const branch: BranchEntity = plainToInstance(BranchEntity, {
          id,
          name: 'a',
          tel: '0999999999',
          address: 'bangkok, thailand',
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

      controllers: [ShowController],
    }).compile();

    controller = module.get<ShowController>(ShowController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('show', () => {
    it('should response 200 ok', async () => {
      const showBranch = await controller.show(1);

      expect(showBranch.status.statusCode).toEqual(200);
      expect(showBranch.status.message).toBe('OK');
      expect(showBranch.data.name).toBe('a');
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
