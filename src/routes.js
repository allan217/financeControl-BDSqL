const express = require('express');
const routes = express.Router();
const ProfileController = require('./Controllers/ProfileController');
const controllersTransactions = require('./Controllers/controllersTransactions');
const controllerLogin = require('./Controllers/controllerLogin');
const controllerHome = require('./Controllers/controllerHome');


function checkAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/');
    }
}

routes.get('/', controllerLogin.index);
routes.get('/home', controllerHome.index);
routes.post('/login', controllerLogin.loginUser);
routes.get('/addUser', controllerLogin.create);
routes.post('/addUser', controllerLogin.create);
routes.get('/page-finance', checkAuthenticated, controllersTransactions.index);
routes.get('/profile', checkAuthenticated, ProfileController.index);
routes.post('/profile', checkAuthenticated, ProfileController.update);
routes.get('/profile/updatePass/:id', checkAuthenticated, ProfileController.updatePass);
routes.post('/profile/updatePass/:id', checkAuthenticated, ProfileController.updatePass);
routes.get('/add', checkAuthenticated, controllersTransactions.create);
routes.post('/add', checkAuthenticated, controllersTransactions.save);
routes.get('/editT/:id', checkAuthenticated, controllersTransactions.edit);
routes.post('/editT/:id', checkAuthenticated, controllersTransactions.update);
routes.get('/delete/:id', checkAuthenticated, controllersTransactions.delete);
routes.post('/delete/:id', checkAuthenticated, controllersTransactions.delete);
routes.get('/logout', controllerLogin.logout);

module.exports = routes;