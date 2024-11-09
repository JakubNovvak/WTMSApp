const UserRepository = require("../Repositories/userRepository");

exports.getAllUsers = async (req, res) => {

    const users = await UserRepository.getAllUsers();

    res.status(200).send(users);
}

exports.addUser = async (req, res) => {
    try 
    {
        const userData = {
            username: req.body.username,
            password: req.body.password
        };

        const newUser = await UserRepository.addUser(userData);
        res.status(201).json({message: "Użytkownik został dodany", user: newUser});

    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Błąd przy tworzeniu użytkownika', error: error.message });
    }    
}