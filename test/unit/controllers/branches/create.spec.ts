import { Test } from '@nestjs/testing';
import { CreateController } from '../../../../src/app/backend/controllers/branches/create.controller';
import { BranchesService } from '../../../../src/app/services/branches.service';
import { CreateDto } from '../../../../src/app/backend/dtos/branches/create.dto';

const dto: CreateDto = {
  name: 'a',
  tel: '0999999999',
  address: 'bangkok, thailand',
};

describe('branches controller', () => {
  let controller: CreateController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: BranchesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((branch: CreateDto) =>
                Promise.resolve({ id: '1', ...branch }),
              ),
          },
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
});
