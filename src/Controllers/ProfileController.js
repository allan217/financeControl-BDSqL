const connection = require('../db/config');

 
module.exports =  {
    async index(req, res) {
        const query = 'SELECT * FROM profile WHERE id = ?';

        connection.query(query, [req.session.userId], (error, results) => {
            if (error) {
                console.error('Erro ao executar a consulta:', error.stack);
                res.status(500).send('Erro ao recuperar os dados do perfil.');
                return;
            }
            const profile = results[0];
            res.render('profile', { profile, userId: req.session.userId });
        });
    },
    async update(req, res) {
        
        const { name, avatar, cpf } = req.body;
        const userId = req.session.userId; // Obtém o ID do usuário da sessão

    if (!userId) {
        return res.status(401).send('Usuário não autenticado.');
    }

        const query = 'UPDATE profile SET name = ?, avatar = ?, cpf = ? WHERE id = ?';

        connection.query(query, [name, avatar, cpf, userId], (error, results) => {
        if (error) {
            console.error('Erro ao atualizar os dados do perfil:', error.stack);
            res.status(500).send('Erro ao atualizar os dados do perfil.');
            return;
        }

        res.redirect('/profile');
    });
    },
    async updatePass(req, res) {
        const { atualPassword, newPassword, reptPassword } = req.body;
        const { id } = req.params; // Supondo que o ID do perfil é passado como um parâmetro na URL

    if (newPassword !== reptPassword) {
        const errorMessageOne = "As novas senhas não coincidem.";
        console.log(errorMessageOne);

        
        const queryGetProfile = 'SELECT * FROM profile WHERE id = ?';
        connection.query(queryGetProfile, [id], (error, results, fields) => {
            if (error) {
                console.error('Erro ao buscar o perfil:', error.stack);
                return res.status(500).send('Erro ao buscar o perfil.');
            }

            if (results.length === 0) {
                console.log('Perfil não encontrado.');
                return res.status(404).send('Perfil não encontrado.');
            }

            const profile = results[0];
            return res.render("profile", { profile, errorMessageOne });
        });
        return;
    }

    
    const queryGetPassword = 'SELECT password FROM profile WHERE id = ?';
    connection.query(queryGetPassword, [id], (error, results, fields) => {
        if (error) {
            console.error('Erro ao buscar a senha atual:', error.stack);
            return res.status(500).send('Erro ao buscar a senha atual.');
        }

        if (results.length === 0) {
            console.log('Perfil não encontrado.');
            return res.status(404).send('Perfil não encontrado.');
        }

        const currentPassword = results[0].password;

        if (currentPassword !== atualPassword) {
            const errorMessageTwo = 'Senha atual incorreta.';
            console.log(errorMessageTwo);

            
            const queryGetProfile = 'SELECT * FROM profile WHERE id = ?';
            connection.query(queryGetProfile, [id], (error, results, fields) => {
                if (error) {
                    console.error('Erro ao buscar o perfil:', error.stack);
                    return res.status(500).send('Erro ao buscar o perfil.');
                }

                if (results.length === 0) {
                    console.log('Perfil não encontrado.');
                    return res.status(404).send('Perfil não encontrado.');
                }

                const profile = results[0];
                return res.render("profile", { profile, errorMessageTwo });
            });
            return;
        }

        
        const queryUpdatePassword = 'UPDATE profile SET password = ? WHERE id = ?';
        connection.query(queryUpdatePassword, [newPassword, id], (error, results, fields) => {
            if (error) {
                console.error('Erro ao atualizar a senha:', error.stack);
                return res.status(500).send('Erro ao atualizar a senha.');
            }

            
            const queryGetProfile = 'SELECT * FROM profile WHERE id = ?';
            connection.query(queryGetProfile, [id], (error, results, fields) => {
                if (error) {
                    console.error('Erro ao buscar o perfil:', error.stack);
                    return res.status(500).send('Erro ao buscar o perfil.');
                }

                if (results.length === 0) {
                    console.log('Perfil não encontrado.');
                    return res.status(404).send('Perfil não encontrado.');
                }

                const profile = results[0];
                const successMessage = 'Senha alterada com sucesso!';
                return res.render("profile", { profile, successMessage });
            });
        });
    });
    
  }
    
}