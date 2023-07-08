import { CreateController } from './create.controller';
import { FindAllController } from './find-all.controller';
import { FindOneController } from './find-one.controller';

console.log('http index ');
const UserController = [CreateController, FindAllController, FindOneController];

export default UserController;
