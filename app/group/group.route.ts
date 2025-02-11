import { Router } from 'express';
import * as groupController from './group.controller';
import * as groupValidator from './group.validation';
import { catchError } from '../common/middleware/cath-error.middleware';
const router = Router();

router
    .get('/', groupController.getAllGroup)
    .get('/:id', groupController.getGroupById)
    .delete('/:id', groupController.deleteGroup)
    .post('/',groupValidator.createGroup, catchError, groupController.createGroup)
    .put('/:id',groupValidator.updateGroup, catchError ,groupController.updateGroup)
    .patch('/:id',groupValidator.editGroup, catchError ,groupController.editGroup)

    export default router;