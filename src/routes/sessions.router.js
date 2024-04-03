import { Router } from "express";
import passport from "passport";
import { failedLogin, failedRegister, getCurrentUser, login, register, forgotPassword, resetPassword } from "../controllers/sessions.controller.js";

const router = Router();

router.post('/register',passport.authenticate('register',{passReqToCallback:true,session:false,failureRedirect:'api/sessions/failedRegister',failureMessage:true}), register);
router.get('/failedRegister', failedRegister)
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/failedLogin',session:false}), login);
router.get('/failedLogin', failedLogin);
router.post('/current', passport.authenticate('current', {session: false}), getCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;