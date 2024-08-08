const mysql = require('mysql')


const connection = mysql.createConnection({
    host: 'databasemysql.c9yuamgqklwd.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '7}-+dGV#f|allanCS217',
    database: 'databaseincontrolAWS'
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySql: ' + err.stack);
        return
    }
    console.log('Conectado ao MySql com ID: ' + connection.threadId);
});


module.exports = connection;