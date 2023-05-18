const userModel = require('../models/userModel');

// metodo para obtener el usuario
exports.getUser = (req, res) => {
    const {email, password} = req.params;

    userModel.findOne({email: email, password: password})
    .then(email => {
        if(!email || !password) throw new Error('User or password incorrect')
        res.json(email);
    })
    .catch(err => res.status(500).json({error: err.message}))
};

// metodo para crear un usuario
exports.createUser = (req, res) => {
    const {name, lastName, email, password, birthDate, city, movil, motorcycle, brand, model, year, registerDate} = req.body;
    const newUser = new userModel({
        name,
        lastName,
        email,
        password,
        birthDate,
        city,
        movil,
        motorcycle,
        brand,
        model,
        year,
        registerDate
    });

    userModel.findOne({email: email})
    .then(user => {
        if(user) {
            throw new Error('User already exist')
        } else {    
            newUser.save()
            .then(() => res.status(201).json({success: 'User created'}))
            .catch(err => res.status(500).json({error: err.message}));
        }
    })
    .catch(err => res.status(500).json({error: err.message}))
};

// metodo para actualizar un usuario
exports.updateUser = (req, res) => {
    const {email} = req.params;
    const {name, lastName, password, birthDate, city, movil, motorcycle, brand, model, year, registerDate} = req.body;

    userModel.findOneAndUpdate({email}, {name, lastName, email, password, birthDate, city, movil, motorcycle, brand, model, year, registerDate}, {new: true})
    .then(user => {
        if (!user) throw new Error(`User ${email} not found`)
        res.status(201).json(user);
    })
    .catch(err => res.status(500).json({error: err.message}));
};

// metodo para eliminar un usuario
exports.deleteUser = (req, res) => {
    const {email} = req.params;

    userModel.findOneAndDelete({email})
    .then(user => {
        if (!user) throw new Error(`User ${email} not found`)
        res.status(201).json({success: `User ${email} deleted`});
    })
    .catch(err => res.status(500).json({error: err.message}));
};