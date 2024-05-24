const connection = require('../db/config')



module.exports = {
    async get() {
        const query = 'SELECT * FROM profile';

        connection.query(query, (error, results, fields) => {
            if (error) {
            console.error('Erro ao executar a consulta:', error.stack);
            return;
        }
        
});
        
    },
    async update(newData) {
        //const db = await Database()

        await db.run(`UPDATE profile SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        cpf = "${newData.cpf}"
        `)
        
        await db.close()
    }
}