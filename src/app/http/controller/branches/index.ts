import { CreateController } from './create.controller';
import { DeleteController } from './delete.controller';
import { PaginateController } from './paginate.controller';
import { ShowController } from './show.controller';
import { UpdateController } from './update.controller';

const BranchesController = [
  CreateController,
  PaginateController,
  ShowController,
  DeleteController,
  UpdateController,
];

export default BranchesController;
