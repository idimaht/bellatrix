import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../../src/app/http/controller/users/create.controller';

describe('UsersController: Create', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
