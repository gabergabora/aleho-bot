import { Router } from 'express';
import passport from 'passport';
import { auth, isAdmin } from '../utils/auth.js';

const indexRouter = Router();

import {
    getIndexPage,
    getStatusPage,
    getLoginPage,
    getSigninPage,
    getLoginFail,
    getSigninFail,
    getLogout,
    getLogger,
    clearLog
} from '../controllers/indexController.js';

indexRouter.get('/', getIndexPage);
indexRouter.get('/login', getLoginPage);
indexRouter.get('/signin', getSigninPage);
indexRouter.get('/loginfail', getLoginFail);
indexRouter.get('/signinfail', getSigninFail);
indexRouter.get('/logout', getLogout);
indexRouter.get('/status', auth, getStatusPage);
indexRouter.get('/logger', auth, isAdmin, getLogger);
indexRouter.get('/clearlogs', auth, isAdmin, clearLog);

indexRouter.post('/loginreq', passport.authenticate('login', { failureRedirect: '/loginfail' }), getIndexPage);
indexRouter.post('/signinreq', passport.authenticate('signin', { failureRedirect: '/signinfail' }), getIndexPage);

export default indexRouter;