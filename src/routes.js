const express = require('express');
const routes = express.Router();
const ProfileController = require('./Controllers/ProfileController');
const controllersTransactions = require('./Controllers/controllersTransactions');
const controllerLogin = require('./Controllers/controllerLogin');



routes.get('/', controllerLogin.index);
routes.post('/login', controllerLogin.loginUser);
routes.post('/addUser', controllerLogin.create);
routes.get('/page-finance', controllersTransactions.index);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);
routes.get('/profile/updatePass/:id', ProfileController.updatePass);
routes.post('/profile/updatePass/:id', ProfileController.updatePass);
routes.get('/add', controllersTransactions.create);
routes.post('/add', controllersTransactions.save);
routes.get('/editT/:id', controllersTransactions.edit);
routes.post('/editT/:id', controllersTransactions.update);
routes.get('/delete/:id', controllersTransactions.delete);
routes.post('/delete/:id', controllersTransactions.delete);

module.exports = routes;