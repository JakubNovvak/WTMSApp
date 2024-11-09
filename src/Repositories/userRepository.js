const User = require('../Models/userModel');

class UserRepository 
{
    static async getAllUsers()
    {
        try {
            
            const users = await User.findAll();
            return users;
        } 
        catch (error) 
        {
            throw new error('Nie udało się pobrać wszystkich użytkowników.');
        }
    }

    static async findById(id)
    {
        try {

            const user = await User.findByPk(id);
            return user;

        } catch (error) {
            throw new error('Error retrieving user by ID.');
        }
    }

    static async findByUsername(username)
    {
        const searchedUser = await User.findOne({where: {username: username}});

        return searchedUser;
    }

    static async addUser(userData)
    {
        const newUser = await User.create(userData);
    }
}

module.exports = UserRepository;