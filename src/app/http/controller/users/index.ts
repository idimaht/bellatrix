import { CreateController } from './create.controller';
import { DeleteController } from './delete.controller';
import { PaginateController } from './paginate.controller';
import { ShowController } from './show.controller';

const UserController = [
  CreateController,
  PaginateController,
  ShowController,
  DeleteController,
];

export default UserController;
