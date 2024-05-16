const mysql = require('mysql')


// Configurar o acesso ao MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passsword: '',
    database: 'databaseincontrol'
})

// Conectar a MySql
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySql: ' + err.stack);
        return
    }
    console.log('Conectado ao MySql com ID: ' + connection.threadId);
});

// Exportar/enviar a conexao(constante connection) para utilizar em outros arquivos.
module.exports = connection;






/*const sqlite3 = require('sqlite3')
const { open } = require('sqlite')



module.exports = () => open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })*/