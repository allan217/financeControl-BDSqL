const dadosLogin = require('../Dados/dadosLogin')
const connection = require('../db/config')



module.exports =  {
    async index(req, res) {
        
        return res.render("login");
    },
    async create(req, res) {

    const { cadName, cadEmail, cadPassword } = req.body;

    await dadosLogin.create({
            name: cadName,
            email: cadEmail,
            password: cadPassword
    });
        
        return res.redirect("/");
    },
    async loginUser(req, res) {

        const { email, password } = req.body;
        
        const query = 'SELECT * FROM dadosLogin';

        connection.query(query, (error, results, fields) => {
            if (error) {
                console.error('Erro ao executar a consulta:', error.stack);
                res.status(500).send('Erro ao recuperar os dados do perfil.');
                return;
            }
            if (email === results[0].email && password === results[0].password) {         
                return res.redirect("page-finance");
            } else {
                res.render("login", { errorMessage: "Credenciais inválidas. Por favor, tente novamente." });
                return false;
            }
        })
        
    } 
   }