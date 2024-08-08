const mysql = require('mysql')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7}-+dGV#f|',
    database: 'databaseincontrol'
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySql: ' + err.stack);
        return
    }
    console.log('Conectado ao MySql com ID: ' + connection.threadId);
});


module.exports = connection;