const Database = require('../db/config')


/*const data = {
    name: "Allan Saldanha",
    avatar: "https://github.com/allan217.png",
    cpf: "111.000.222-33"
}*/


module.exports = {
    async get() {
        const db = await Database()
        const data = await db.get(`SELECT * FROM profile`);
        await db.close()
        
        return {
            id: data.id,
            name: data.name,
            avatar: data.avatar,
            cpf: data.cpf
        };
        
    },
    async update(newData) {
        const db = await Database()

        await db.run(`UPDATE profile SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        cpf = "${newData.cpf}"
        `)
        
        await db.close()
    }
}