import {Router} from 'express';
import { addUserIntoCourse, createUser, getAllUsers } from '../controllers/users.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/:uid/courses/:cid', addUserIntoCourse);

export default router;