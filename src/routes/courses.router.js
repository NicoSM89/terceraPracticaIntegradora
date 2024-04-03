import { Router } from 'express';
import { createCourse, getAllCourses } from '../controllers/courses.controller.js';
import { applyPolicies } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = Router();

router.use(passport.authenticate('current', {session: false}));
router.get('/', applyPolicies(['PUBLIC']), getAllCourses);
router.post('/', applyPolicies(['TEACHER']), createCourse);

export default router;