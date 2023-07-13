import { Test, TestingModule } from '@nestjs/testing';
import { BranchesService } from 'src/app/services/branches.service';
import { CreateController } from 'src/app/http/controller/branches/create.controller';
import { CreateDto } from 'src/app/http/dtos/branches/create.dto';

describe('BranchesController: create', () => {
  let controller: CreateController;
  let fakeBranchService: Partial<BranchesService>;

  beforeEach(async () => {
    fakeBranchService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateController],
      providers: [
        {
          provide: BranchesService,
          useValue: fakeBranchService,
        },
      ],
    }).compile();

    controller = module.get<CreateController>(CreateController);
  });

  it('should be return OK', () => {
    const addBranch = await controller.create(CreateDto);

    expect(controller).toBeDefined();
    expect(addBranch.status.statusCode, 200);
  });
});
