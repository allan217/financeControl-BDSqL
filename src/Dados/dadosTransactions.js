const connection = require("../db/config")



module.exports = {
    async get() {
        try {
            const query = 'SELECT * FROM trans';
            
            // Executar a consulta ao banco de dados
            const queryResult = await connection.query(query);
    
            // Verificar se os resultados existem e são um array
            if (!queryResult || !Array.isArray(queryResult.results)) {
                console.error("Os resultados da consulta não são um array:", queryResult);
                return { trans: [], cardIncome: [], cardExpense: [], cardTotal: [] }; // Retorna uma estrutura de dados vazia
            }
    
            // Mapear os resultados para o formato desejado
            const formattedData = queryResult.results.map(item => ({
                id: item.id,
                description: item.description,
                amount: item.amount,
                date: item.date
            }));
    
            return {
                trans: formattedData,
                cardIncome: [],
                cardExpense: [],
                cardTotal: []
            };
        } catch (error) {
            console.error("Erro ao recuperar dados de transações:", error);
            return { trans: [], cardIncome: [], cardExpense: [], cardTotal: [] }; // Retorna uma estrutura de dados vazia em caso de erro
        }
    },
    async update(updatedTrans, transId) {
        const db = await Database()

        await db.run(`UPDATE trans SET 
            description = "${updatedTrans.description}",
            amount = ${updatedTrans.amount},
            date = "${updatedTrans.date}"
            WHERE id = ${transId}
        `)

        await db.close()
    },
    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM trans WHERE id = ${id}`)

        await db.close()
    },
    async save(newTrans) {
        const db = await Database()

        await db.run(`INSERT INTO trans (
            description,
            amount,
            date
        ) VALUES (
            "${newTrans.description}",
            ${newTrans.amount},
            "${newTrans.date}"
        )`)

        await db.close()
    }

}