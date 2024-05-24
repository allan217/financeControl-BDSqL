const connection = require('../db/config')



module.exports = {
    async get() {
        //const db = await Database()
        const data = await connection.query(`SELECT * FROM dadosLogin`);
        //await Database.end()
        
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password
        };
        
    },
    async create(newUser) {
        //const db = await Database()

        await Database.query(`INSERT INTO dadosLogin (
            name,
            email,
            password
        ) VALUES (
            "${newUser.name}",
            "${newUser.email}",
            "${newUser.password}"
        )`)
        
        await Database.end()
        
    },
    async update(newData) {
        //const db = await Database()
        
        await Database.query(`UPDATE dadosLogin SET
        name = "${newData.name}",
        email = "${newData.email}",
        password = "${newData.password}"
        `)
        
        await Database.end()
    },
    async updatePass(newPassword, passId) {
        //const db = await Database()

        await connection.query(`UPDATE dadosLogin SET
        password = "${newPassword}"
        WHERE id = ${passId}
        `)
        
        await connection.end()
    }
}