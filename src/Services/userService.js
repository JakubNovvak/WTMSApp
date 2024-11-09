const { findByUsername, createUser, findAllUsers } = require("../Repositories/userRepository");

class UserService 
{
    static async getAllUsers()
    {
        try
        {
            const foundUsers = await findAllUsers();

            if(foundUsers == null)
                return [];

            return foundUsers;

        } catch (error) 
        {
            console.error("Nie udało się pobrać listy użytkowników", error);
        }
    }

    static async getUserByUsername(username)
    {
        try 
        {
            const searchedUser = await findByUsername(username);

            if(searchedUser == null)
                throw new Error("");

            return searchedUser;
        } catch (error) 
        {
            console.error("Nie udało pobrać informacji na temat użytkownika", error);
        }
    }

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

    static async addNewUser(requestBody)
    {
        const userData = {
            username: requestBody.username,
            password: requestBody.password,
            name: requestBody.name,
            surname: requestBody.surname,
        }

        try 
        {
            const createdUser = await createUser(userData);
            return createdUser;

        } catch (error) 
        {
            console.error("Nie udało się utworzyć nowego użytkownika", error);
        }
    }
}

module.exports = UserService;