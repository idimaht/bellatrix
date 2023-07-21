import { Test, TestingModule } from '@nestjs/testing';
import { BranchesService } from '../../../../src/app/services/branches.service';
import { BranchEntity } from '../../../../src/app/entities/branch.entity';
import { plainToInstance } from 'class-transformer';
import { DeleteController } from '../../../../src/app/backend/controllers/branches/delete.controller';

describe('branches controller', () => {
  let controller: DeleteController;
  let service: Partial<BranchesService>;

  beforeEach(async () => {
    service = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BranchesService,
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
      const removeBranch = await controller.delete(1);

      expect(removeBranch.status.statusCode).toEqual(200);
      expect(removeBranch.status.message).toBe('OK');
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
