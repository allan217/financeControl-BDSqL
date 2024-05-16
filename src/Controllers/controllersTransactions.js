const Transaction = require('../Dados/dadosTransactions');
const Profile = require('../Dados/Profile')

module.exports = {
    // Método para salvar uma nova transação
    async save(req, res) {
        //const transImport = await Transaction.get();
        //const transId = transImport.trans.length > 0 ? transImport.trans[transImport.trans.length - 1].id : 0;
        await Transaction.save({
            //id: transId + 1,
            description: req.body.description,
            amount: Number(req.body.amount),
            date: req.body.date
        })

        //console.log("Nova transação salva:", transImport.trans);
        return res.redirect('page-finance');
    },

    // Método para renderizar a página de adicionar transação
    create(req, res) {
        return res.render("addtrans");
    },

    // Método para renderizar a página de finanças e calcular os totais
    async index(req, res) {
        
                        
            const transImport = await Transaction.get(); // Aguarde a resolução da promessa
            
            function removeFirstItem() {
                if (transImport.cardIncome && transImport.cardIncome.length > 1) {
                    transImport.cardIncome.shift();
                }
                if (transImport.cardExpense && transImport.cardExpense.length > 1) {
                    transImport.cardExpense.shift();
                }
                if (transImport.cardTotal && transImport.cardTotal.length > 1) {
                    transImport.cardTotal.shift();
                }
            }

            function sumAttributeAndAddResult(array1, attribute, array2, array3, array4) {

                if (!array1 || array1.length === 0) {
                    return; // Retorna se o array estiver vazio ou indefinido
                }

                let totalIncome = 0;
                let totalExpense = 0;

                array1.forEach(objeto => {
                    if (objeto[attribute] > 0) {
                        totalIncome += objeto[attribute];
                    } else {
                        totalExpense += objeto[attribute];
                    }
                });

                const total = totalIncome + totalExpense;
                array2.push(totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                array3.push(totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                array4.push(total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
            }

            sumAttributeAndAddResult(transImport.trans, 'amount', transImport.cardIncome, transImport.cardExpense, transImport.cardTotal);
            removeFirstItem();


            return res.render("page-finance", { transactions: transImport, teste: await Profile.get() });
        
    },

    // Método para renderizar a página de edição de transação
    async edit(req, res) {
        const transImport = await Transaction.get();
        const transId = req.params.id;
        const transaction = transImport.trans.find(trans => trans.id === Number(transId));

        if (!transaction) {
            return res.status(404).send('Transação não encontrada!');
        }

        return res.render("edittrans", { transaction });
    },

    // Método para atualizar/editar uma transação
    async update(req, res) {
        //const transImport = await Transaction.get();
        const transId = req.params.id;
        //const transaction = transImport.trans.findIndex(trans => Number(trans.id) === Number(transId));

        const updatedTrans = {
            description: req.body.description,
            amount: Number(req.body.amount),
            date: req.body.date
        }

        await Transaction.update(updatedTrans, transId)        

        /*if (transaction === -1) {
            return res.status(404).send('Transação não encontrada!');
        }

        // Atualiza os atributos da transação com os novos valores
        transImport.trans[transaction].description = req.body.description;
        transImport.trans[transaction].amount = Number(req.body.amount);
        transImport.trans[transaction].date = req.body.date;

        console.log("Transação atualizada:", transImport.trans[transaction]); */
        
        res.redirect('/page-finance'); // Redireciona para a página de transações.
    },
    // Método para remover uma transação
    async delete(req, res) {
        //const transImport = await Transaction.get();
        const transId = req.params.id;

        //const index = transImport.trans.findIndex(trans => trans.id === Number(transId));
        await Transaction.delete(transId)
        /*console.log("O ID é: ", index)
        if (index !== -1) {
            transImport.trans.splice(index, 1);
            console.log("Transação removida:", transId);
        } else {
            console.log("Transação não encontrada:", transId);
        }*/


        res.redirect('/page-finance'); // Redireciona para a página de transações.
    }
}