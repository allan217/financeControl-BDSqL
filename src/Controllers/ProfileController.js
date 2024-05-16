const Profile = require('../Dados/Profile')
const dadosLogin = require('../Dados/dadosLogin')

 
module.exports =  {
    async index(req, res) {
        
            const profile = await Profile.get();
            
            return res.render("profile", { profile });
        
        
    },
    async update(req, res) {
        // Obter os novos dados do corpo da requisição
        const newData = req.body;
        
        // Obter os dados do perfil atual
        const profile = await Profile.get();


        // Mesclar os novos dados com os dados do perfil atual
        const updatedProfile = { ...profile, ...newData };

        // Chamar o método update do perfil com os dados combinados
        await Profile.update(updatedProfile);

        return res.redirect('/profile');
    },
    async updatePass(req, res) {
        const passId = req.params.id;
        console.log(passId)
        const { atualPassword, newPassword, reptPassword } = req.body;
        if (newPassword !== reptPassword) {
            console.log("As novas senhas não correspondem.");
            const profile = await Profile.get();
            res.render("profile", { errorMessageOne: "As novas senhas não correspondem.", profile });
            return;
        }
    
        const dadosLoginAtual = await dadosLogin.get();
        
        if (atualPassword !== dadosLoginAtual.password) {
            console.log("Senha atual incorreta!");
            const profile = await Profile.get();
            res.render("profile", { errorMessageTwo: "Senha atual incorreta. Por favor, tente novamente.", profile });
            return;
        }
        console.log("Senha alterada com sucesso!!")
        await dadosLogin.updatePass(newPassword, passId);
    
        res.redirect('/profile');
    }
    
   }