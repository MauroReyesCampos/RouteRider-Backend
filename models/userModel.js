// importación del módulo mongoose
const mongoose = require('mongoose');

// dirección de la base de datos en MongoDb
const uri ='mongodb+srv://admin:Plx2MNJXr9ycW2Ye@routerider.ugekxw2.mongodb.net/routeriderDB?retryWrites=true&w=majority';

// conexión a la base de datos
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database connection successful'))
.catch(err => console.error('Error al conectar a la base de datos', err));

// creación del esquema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    birthday: {type: String, required: true},
    city: {type: String, required: true},
    motorcycle: {type: String, required: true},
    brand: {type: String, required: false},
    model: {type: String, required: false},
    type: {type: String, required: false},
    year: {type: String, required: false},
    registerDate: {type: Date, required: false}
});

// exportación del esquema a la colección en la base de datos
module.exports = mongoose.model('users', userSchema);