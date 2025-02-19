import { Router } from 'express';
import { catchError } from '../common/middleware/cath-error.middleware';
import * as userController from './user.controller';
import * as userValidator from './user.validation';

const router = Router();

router.get('/', userController.getAllUser);
router.get('/:id', catchError, userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.post('/', userValidator.createUser, catchError, userController.createUser);
router.put('/:id', userValidator.updateUser, catchError, userController.updateUser);
router.patch('/:id', userValidator.editUser, catchError, userController.editUser);

export default router;