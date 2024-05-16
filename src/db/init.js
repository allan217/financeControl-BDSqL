const Database = require('./config');

const initDB = {
    
    async init() {
        try {
            const db = await Database()

            await db.query(`CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name TEXT,
                avatar TEXT,
                cpf TEXT
            )`);

            await db.query(`CREATE TABLE dadosLogin (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name TEXT,
                email TEXT,
                password TEXT
            )`);

            await db.query(`CREATE TABLE trans (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                description TEXT,
                amount FLOAT,
                date DATETIME
            )`)
    
    
            await db.end()
            console.log("Dados inseridos com sucesso!!")

        } catch (error) {
        console.log("Erro ao inserir dados no banco.", error.message)
    
        }
    }
}

initDB.init()