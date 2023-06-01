const commentModel = require('../models/commentModel');

// metodo para obtener los comentarios del usuario
exports.getAllComment = (req, res) => {
    const {userEmail} = req.params;

    commentModel.find()
    .then(comment => res.json(comment))
    .catch(err => res.status(500).json({error: err.message}));
};

// metodo para crear un comentario
exports.createUserComment = (req, res) => {
    const {userEmail, userComment, commentRoute, commentDate} = req.body;
    const newUser = new commentModel({
        userEmail,
        userComment,
        commentRoute,
        commentDate
    });

    newUser.save()
    .then(() => res.status(201).json({success: 'Comment created'}))
    .catch(err => res.status(500).json({error: err.message}));
};

// metodo para actualizar un comentario
exports.updateUserComment = (req, res) => {
    const {id} = req.params;
    const {userEmail, userComment, commentRoute, commentDate} = req.body;

    commentModel.findByIdAndUpdate(id, {userEmail, userComment, commentRoute, commentDate}, {new: true})
    .then(comment => {
        if (!comment) throw new Error(`Comment width ${id} not found`)
        res.status(201).json(comment);
    })
    .catch(err => res.status(500).json({error: err.message}));
};

// metodo para eliminar un comentario
exports.deleteUserComment = (req, res) => {
    const {id} = req.params;

    commentModel.findByIdAndDelete(id)
    .then(comment => {
        if (!comment) throw new Error(`Comment width id:${id} not found`)
        res.status(201).json({success: `Comment width id:${id} deleted`});
    })
    .catch(err => res.status(500).json({error: err.message}));
};