const connection = require('../db/config')


module.exports = {

    // Método para renderizar a página de finanças e calcular os totais.
    async index(req, res) {
        const query = 'SELECT * FROM trans';

        connection.query(query, (error, results) => {
            if (error) {
                console.error('Erro ao executar a consulta:', error.stack);
                res.status(500).send('Erro ao recuperar os dados de transações.');
                return;
            }

            const transactions = {
                trans: results,
                cardIncome: [],
                cardExpense: [],
                cardTotal: []              
            };

            function removeFirstItem() {
                if (transactions.cardIncome && transactions.cardIncome.length > 1) {
                    transactions.cardIncome.shift();
                }
                if (transactions.cardExpense && transactions.cardExpense.length > 1) {
                    transactions.cardExpense.shift();
                }
                if (transactions.cardTotal && transactions.cardTotal.length > 1) {
                    transactions.cardTotal.shift();
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

            sumAttributeAndAddResult(transactions.trans, 'amount', transactions.cardIncome, transactions.cardExpense, transactions.cardTotal);
            removeFirstItem();
            
            // Consulta para obter os dados do perfil
            const queryProfile = 'SELECT * FROM profile WHERE id = 1';

            connection.query(queryProfile, (error, resultsProfile) => {
                if (error) {
                    console.error('Erro ao executar a consulta:', error.stack);
                    res.status(500).send('Erro ao recuperar os dados do perfil.');
                    return;
                }

                if (resultsProfile.length === 0) {
                    console.log('Perfil não encontrado.');
                    res.status(404).send('Perfil não encontrado.');
                    return;
                }

                const profile = resultsProfile[0];
                // Renderiza a página com transações e perfil
                res.render('page-finance', { transactions, profile });
            });
 
        });
        
            
        
    },
    // Método para salvar uma nova transação
    async save(req, res) {
        const {description, amount, date} = req.body;
        
        const query = 'INSERT INTO trans (description, amount, date) VALUES (?, ?, ?)';

        connection.query(query, [description, amount, date], (error, results) => {
            if (error) {
                console.error('Erro ao inserir transação: ', error.stack);
                res.status(500).send('Erro ao adicionar transação.');
                return;
            }
        } )

        return res.redirect('page-finance');
    },
    // Método para renderizar a página que adiciona transação.
    create(req, res) {
        return res.render("addtrans");
    },
    // Método para renderizar a página de edição de transação
    async edit(req, res) {
        const { id } = req.params;
        
        const query = 'SELECT * FROM trans WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erro ao buscar a transação:', error.stack);
                res.status(500).send('Erro ao buscar a transação.');
                return;
            }
            
            res.render('edittrans', { transaction: results[0] });
        });
        
    },
    // Método para atualizar uma transação
    async update(req, res) {
        const { id } = req.params;
        const { description, amount, date } = req.body;
    
        connection.query('SELECT * FROM trans WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error('Erro ao verificar o ID:', error.stack);
                res.status(500).send('Erro ao verificar o ID.');
                return;
            }
    
            if (results.length === 0) {
                res.status(404).send('Transação não encontrada.');
                return;
            }
    
            const query = 'UPDATE trans SET description = ?, amount = ?, date = ? WHERE id = ?';
            connection.query(query, [description, amount, date, id], (error, updateResults) => {
                if (error) {
                    console.error('Erro ao atualizar a transação:', error.stack);
                    res.status(500).send('Erro ao atualizar a transação.');
                    return;
                }
    
                
    
                res.redirect('/page-finance');
            });
        });
    },
    // Método para remover uma transação
    async delete(req, res) {
        
        const { id } = req.params;

        const query = 'DELETE FROM trans WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erro ao deletar a transação:', error.stack);
                res.status(500).send('Erro ao deletar a transação.');
                return;
            }

            res.redirect('/page-finance');
        });
    }
}