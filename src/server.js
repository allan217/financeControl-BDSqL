const express = require('express');
const session = require('express-session');
const server = express()
const routes = require("./routes");
const path = require("path");



server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, "views"))

server.use(express.static("public"))

// Liberar o req.body, para pegar os dados digitados pelo usuário.
server.use(express.urlencoded({extended: true}))

server.use(session({
    secret: '@llan21771245',
    resave: false,
    saveUninitialized: true
}));

server.use(routes)

server.listen(3000)
