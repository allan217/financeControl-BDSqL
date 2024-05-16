const dadosLogin = require('../Dados/dadosLogin')



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
        
        const user = await dadosLogin.get();
                
        if (email === user.email && password === user.password) {         
            return res.redirect("page-finance");
        } else {
            res.render("login", { errorMessage: "Credenciais inválidas. Por favor, tente novamente." });
            return false;
        }
        
    }
   }