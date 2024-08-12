const connection = require('../db/config')


module.exports =  {
    async index(req, res) {
        
        return res.render("login");
    },
    async create(req, res) {
        const { cadName, cadAvatar, cadCpf, cadEmail, cadPassword } = req.body;

    // Verificar se o email já está em uso
    const checkEmailQuery = 'SELECT * FROM profile WHERE email = ?';
    connection.query(checkEmailQuery, [cadEmail], (error, results) => {
        if (error) {
            console.error('Erro ao verificar o email:', error.stack);
            return res.status(500).send('Erro ao verificar o email.');
        }

        if (results.length > 0) {
            return res.render('login', { errorMessage: 'Email já está em uso. Por favor, use outro email.' });
        }


            // Inserir novo usuário.
            const insertQuery = 'INSERT INTO profile (name, avatar, cpf, email, password) VALUES (?, ?, ?, ?, ?)';
            connection.query(insertQuery, [cadName, cadAvatar, cadCpf, cadEmail, cadPassword], (error, results) => {
                if (error) {
                    console.error('Erro ao criar novo usuário:', error.stack);
                    return res.status(500).send('Erro ao criar novo usuário.');
                }

                res.redirect('/');
            });
    });
    
    },
    async loginUser(req, res) {

        const { email, password } = req.body;
        
        const query = 'SELECT * FROM profile WHERE email = ?';

        connection.query(query, [email], (error, results) => {
            if (error) {
                console.error('Erro ao executar a consulta:', error.stack);
                res.status(500).send('Erro ao recuperar os dados do perfil.');
                return;
            }
            if (email === results[0].email && password === results[0].password) { 
                req.session.userId = results[0].id;        
                return res.redirect("page-finance");
            } else {
                res.render("login", { errorMessage: "Credenciais inválidas. Por favor, tente novamente." });
                return false;
            }
            
        })
        
    },
    async logout(req, res)  {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao fazer logout:', err.stack);
                return res.status(500).send('Erro ao fazer logout.');
            }
            res.redirect('/');
        });
    }
}
