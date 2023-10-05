import { readUser } from '../utils/helpers.js';

export const auth = function (req, res, next) {
    if (req.user === undefined) {
        return res.render('msgpage', { user: readUser(req), msg: 'No Autorizado' });
    };
    next();
};

export const isAdmin = function (req, res, next) {
    if (!req.user.admin) {
        return res.render('msgpage', { user: readUser(req), msg: 'Solo los administradores pueden ver esta pagina' });
    };
    next();
};