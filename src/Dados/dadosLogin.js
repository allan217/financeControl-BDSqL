const Database = require('../db/config')



module.exports = {
    async get() {
        const db = await Database()
        const data = await db.get(`SELECT * FROM dadosLogin`);
        await db.close()
        
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password
        };
        
    },
    async create(newUser) {
        const db = await Database()

        await db.run(`INSERT INTO dadosLogin (
            name,
            email,
            password
        ) VALUES (
            "${newUser.name}",
            "${newUser.email}",
            "${newUser.password}"
        )`)
        
        await db.close()
        
    },
    async update(newData) {
        const db = await Database()
        
        await db.run(`UPDATE dadosLogin SET
        name = "${newData.name}",
        email = "${newData.email}",
        password = "${newData.password}"
        `)
        
        await db.close()
    },
    async updatePass(newPassword, passId) {
        const db = await Database()

        await db.run(`UPDATE dadosLogin SET
        password = "${newPassword}"
        WHERE id = ${passId}
        `)
        
        await db.close()
    }
}