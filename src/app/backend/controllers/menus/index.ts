import { CreateController } from './create.controller';
import { DeleteController } from './delete.controller';
import { PaginateController } from './paginate.controller';
import { ShowController } from './show.controller';
import { UpdateController } from './update.controller';

const MenusController = [
  CreateController,
  PaginateController,
  ShowController,
  DeleteController,
  UpdateController,
];

export default MenusController;
