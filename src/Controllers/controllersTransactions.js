const connection = require('../db/config')


module.exports = {

    // Método para renderizar a página de finanças e calcular os totais.
    async index(req, res) {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).send('Usuário não autenticado.');
        }


        const { month, date } = req.query;
        let query = 'SELECT * FROM trans WHERE userId = ?';
        let queryParams = [userId];

        if (month) {
            query += ' AND DATE_FORMAT(date, "%Y-%m") = ?';
            queryParams.push(month);
        }

        if (date) {
            query += ' AND DATE(date) = ?';
            queryParams.push(date);
        }


        

        connection.query(query, queryParams, (error, results) => {
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
            const queryProfile = 'SELECT * FROM profile WHERE id = ?';

            connection.query(queryProfile, [userId], (error, results) => {
                if (error) {
                    console.error('Erro ao executar a consulta:', error.stack);
                    res.status(500).send('Erro ao recuperar os dados do perfil.');
                    return;
                }
        
                const profile = results[0];

                if (results.length === 0) {
                    console.log('Perfil não encontrado.');
                    res.status(404).send('Perfil não encontrado.');
                    return;
                }

                
                // Renderiza a página com transações e perfil
                res.render('page-finance', { transactions, profile, userId });
            });
 
        });
        
            
        
    },
    // Método para salvar uma nova transação
    async save(req, res) {
        const {description, amount, date} = req.body;
        const userId = req.session.userId;

        if (!userId) {
            res.status(401).send('Usuário não autenticado.');
        }
        const query = 'INSERT INTO trans (description, amount, date, userId) VALUES (?, ?, ?, ?)';

        connection.query(query, [description, amount, date, userId], (error, results) => {
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
        const userId = req.session.userId;

        if (!userId) {
            res.status(401).send('Usuario não autenticado.');
        }
        
        const query = 'SELECT * FROM trans WHERE id = ? AND userId = ?';
        connection.query(query, [id, userId], (error, results) => {
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
        const userId = req.session.userId;

        if (!userId) {
            res.status(401).send('Usuário não autenticado.')
        }
    
        connection.query('SELECT * FROM trans WHERE id = ? AND userId = ?', [id, userId], (error, results) => {
            if (error) {
                console.error('Erro ao verificar o ID:', error.stack);
                res.status(500).send('Erro ao verificar o ID.');
                return;
            }
    
            if (results.length === 0) {
                res.status(404).send('Transação não encontrada.');
                return;
            }
    
            const query = 'UPDATE trans SET description = ?, amount = ?, date = ? WHERE id = ? AND userId = ?';
            connection.query(query, [description, amount, date, id, userId], (error, updateResults) => {
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
        const userId = req.session.userId;

        if (!userId) {
            res.status(401).send('Usuario não autenticado');
        }

        const query = 'DELETE FROM trans WHERE id = ? AND userId = ?';
        connection.query(query, [id, userId], (error, results) => {
            if (error) {
                console.error('Erro ao deletar a transação:', error.stack);
                res.status(500).send('Erro ao deletar a transação.');
                return;
            }

            res.redirect('/page-finance');
        });
    }
}