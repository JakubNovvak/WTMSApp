const { findByUsername, createUser, findAllUsers, findById, updateUser } = require("../Repositories/userRepository");

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
        const searchedUser = await findByUsername(username);

        if(searchedUser == null)
            throw new Error("");

        return searchedUser;
    }

    static async getUserIdByCredentials(username)
    {
        const searchedUser = await findByUsername(username);

        if(searchedUser == null)
            throw new Error("");

        return searchedUser.get('id');
    }

    static async checkUserCredentials(userLogin, userPassword) 
    {
        const user = await findByUsername(userLogin);

        console.log(user);

        if(user == null)
            return false;

        if(user.username != userLogin || user.password != userPassword)
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
            hourlyPay: requestBody.hourlyPay
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

    static async updateUserInfo(userId, requestBody) {
        try {
            const updatedData = {
                username: requestBody.username,
                name: requestBody.name,
                surname: requestBody.surname,
                hourlyPay: requestBody.hourlyPay
            };

            const updatedUser = updateUser(userId, updatedData);

            if(!updatedUser)
                throw new Error("Nie znaleziono użytkownika o zadanym id.");

        } catch (error) {
            console.error("Nie udało się zaktualizować użytkownika", error);
            throw error;
        }
    }
}

module.exports = UserService;