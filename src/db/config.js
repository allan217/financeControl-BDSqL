const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

//const mysql = require('mysql2/promise')

module.exports = () => open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })

/*module.exports = async () => {
        const connection = await mysql.createPool({
            host: '127.0.0.1', // ou o endereço do seu servidor MySQL
            user: 'root',
            password: '',
            database: 'dataBaseInControl'
        });
        return connection;
    };*/