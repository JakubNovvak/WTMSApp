const { addNewUser, getAllUsers, getUserIdByCredentials } = require("../Services/userService");

// --- Pobranie użytkownika po Id
exports.getUserId = async (req, res) => {

    try 
    {
        const userId = await getUserIdByCredentials(req.params.username);
        res.status(200).json({message: "Pomyślnie uzyskano id użytkownika", userId: userId});

    } catch (error) 
    {
        res.status(500).json({message: "Nie udało się uzyskać id", userId: -1});
    }
}

// --- Pobranie listy wszystkich użytkowników
exports.getAllUsers = async (req, res) => {

    try 
    {
        const users = await getAllUsers();
        res.status(200).send(users);    

    } catch (error) 
    {
        res.status(500).send("Nie udało się pobrać listy użytkowników.");
    }
}

// --- Dodanie użytkownika
exports.addUser = async (req, res) => {
    try 
    {
        const newUser = await addNewUser(req.body);
        res.status(201).json({message: "Użytkownik został dodany", user: newUser});

    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: 'Błąd przy tworzeniu użytkownika', error: error.message });
    }    
}