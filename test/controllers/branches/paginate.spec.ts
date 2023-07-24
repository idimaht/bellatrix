import { Test, TestingModule } from '@nestjs/testing';
import { BranchesService } from '@services/branches.service';
import { BranchEntity } from '@entities/branch.entity';
import { plainToInstance } from 'class-transformer';
import { PaginateController } from '@controllers/branches/paginate.controller';
import { Pagination } from 'nestjs-typeorm-paginate';

let httpMocks = require('node-mocks-http');

const request = httpMocks.createRequest({
  method: 'PATCH',
  url: '/branches',
  params: {
    search: 'a',
    orderBy: 'ASC',
  },
});

describe('branches controller', () => {
  let controller: PaginateController;
  let service: Partial<BranchesService>;

  beforeEach(async () => {
    service = {
      paginate: () => {
        const branch: BranchEntity = plainToInstance(BranchEntity, {
          id: 4,
          name: 'a',
          tel: '0999999995',
          address: 'bangkok, thailand',
        });

        const branch2: BranchEntity = plainToInstance(BranchEntity, {
          id: 4,
          name: 'a',
          tel: '0999999995',
          address: 'bangkok, thailand',
        });

        const branch3: BranchEntity = plainToInstance(BranchEntity, {
          id: 4,
          name: 'a',
          tel: '0999999995',
          address: 'bangkok, thailand',
        });

        return Promise.resolve({
          items: [branch, branch2, branch3],
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
          },
          links: {},
        } as Pagination<BranchEntity>);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BranchesService,
          useValue: service,
        },
      ],

      controllers: [PaginateController],
    }).compile();

    controller = module.get<PaginateController>(PaginateController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('paginate', () => {
    it('should response 200 ok', async () => {
      jest.spyOn(service, 'paginate');

      const branch = await controller.paginate(request);

      expect(branch.data.length).toEqual(3);
      expect(branch.status.statusCode).toEqual(200);
      expect(branch.status.message).toBe('OK');
    });
  });

  describe('paginate', () => {
    it('should throw an exception', async () => {
      jest.spyOn(service, 'paginate').mockRejectedValue(new Error('error'));

      try {
        await controller.paginate(request);
      } catch (error) {
        return;
      }
    });
  });
});
