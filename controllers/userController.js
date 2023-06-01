const { json } = require('express');
const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs");

// metodo para obtener el usuario
exports.getAllUsers = (req, res) => {
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({error: err.message}));
};

// metodo para crear un usuario
exports.createUser = (req, res) => {
    const {firstName, lastName, email, password, birthDate, city, mobile, motorcycle, brand, model, year, registerDate} = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash){
        if(err) {
            return res.status(500).json({error: err.message});
        } else {
            const newUser = new userModel({
                firstName,
                lastName,
                email,
                password: hash,
                birthDate,
                city,
                mobile,
                motorcycle,
                brand,
                model,
                year,
                registerDate
            });
            newUser.save()
            .then(() => res.status(201).json({success: "User created"}))
            .catch(err => res.status(500).json({error: err.message}));
        }
    });
};

// metodo para actualizar un usuario
exports.updateUser = (req, res) => {
    const {id} = req.params;
    const saltRounds = 10;
    const {firstName, lastName, email, password, birthDate, city, mobile, motorcycle, brand, model, year, registerDate} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash){
        if(err) {
            return res.status(500).json({error: err.message});
        } else {
            userModel.findByIdAndUpdate(id, {firstName, lastName, email, password: hash, birthDate, city, mobile, motorcycle, brand, model, year, registerDate}, {new: true})
            .then(user => {
                if(!user) throw new Error(`User with ID: ${email} not found`);
                res.status(200).json({user});
            })
            .catch(err => res.status(404).json({error: err.message}));
        }
    });
};

// metodo para eliminar un usuario
exports.deleteUser = (req, res) => {
    const {id} = req.params;

    userModel.findByIdAndDelete(id)
    .then(user => {
        if (!user) throw new Error(`User ${id} not found`)
        res.status(201).json({success: `User ${user.email} deleted`});
    })
    .catch(err => res.status(500).json({error: err.message}));
};