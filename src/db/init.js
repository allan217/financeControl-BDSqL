const connection = require('./config');

const initDB = {
    
    async init() {
        
        try {
            await connection.query(`CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255),
                avatar VARCHAR(255),
                cpf VARCHAR(14)
            )`);

            await connection.query(`CREATE TABLE IF NOT EXISTS dadosLogin (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255)
            )`);

            await connection.query(`CREATE TABLE IF NOT EXISTS trans (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                description TEXT,
                amount FLOAT,
                date DATETIME
            )`);

            const today = new Date();
            const formattedDate = today.toISOString().slice(0, 19).replace('T', ' ');

            await connection.query(`INSERT INTO dadosLogin (
                name,
                email,
                password
            ) VALUES (
                "Allan Saldanha",
                "sanguec777@gmail.com",
                "@llan217712"
            )`);
    
    
            
            console.log("Tabelas criadas e dados inseridos com sucesso!!")
                
        } catch (error) {
            console.log("Erro ao inserir dados nas tabelas.", error.message)
    
        } finally {
            if (connection) await connection.end();
        }
    }
}

initDB.init()