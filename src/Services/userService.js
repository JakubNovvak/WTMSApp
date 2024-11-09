const { findByUsername } = require("../Repositories/userRepository");

class UserService 
{
    static async checkUserCredentials(userLogin, userPassword) 
    {
        const user = await findByUsername(userLogin);

        console.log(user);

        if(user == null)
            return false;

        if(user.username != userLogin && user.password != userPassword)
            return false;

        return true;
    }
}

module.exports = UserService;