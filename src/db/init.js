const connection = require('./config');

const initDB = {
    
    async init() {
        let db;
        try {
            db = await connection.connect();

            await db.query(`CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255),
                avatar VARCHAR(255),
                cpf VARCHAR(14)
            )`);

            await db.query(`CREATE TABLE dadosLogin (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255)
            )`);

            await db.query(`CREATE TABLE trans (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                description TEXT,
                amount FLOAT,
                date DATETIME
            )`);
    
    
            
            console.log("Tabelas criadas com sucesso!!")

        } catch (error) {
            console.log("Erro ao criar tabela no banco.", error.message)
    
        } finally {
            if (db) await db.end();
        }
    }
}

initDB.init()