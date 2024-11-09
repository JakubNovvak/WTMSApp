const { addNewUser, getAllUsers } = require("../Services/userService");

exports.getAllUsers = async (req, res) => {

    const users = await getAllUsers();

    res.status(200).send(users);
}

exports.addUser = async (req, res) => {
    try 
    {
        const newUser = await addNewUser(req.body);
        res.status(201).json({message: "Użytkownik został dodany", user: newUser});

    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Błąd przy tworzeniu użytkownika', error: error.message });
    }    
}