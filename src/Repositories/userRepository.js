const User = require('../Models/userModel');

class UserRepository 
{
    static async findAllUsers()
    {
        const users = await User.findAll();
        return users;
    }

    static async findById(id)
    {
        const user = await User.findByPk(id);
        return user;
    }

    static async findByUsername(username)
    {
        const searchedUser = await User.findOne({where: {username: username}});
        return searchedUser;
    }

    static async createUser(userData)
    {
        const newUser = await User.create(userData);
        return newUser;
    }
}

module.exports = UserRepository;