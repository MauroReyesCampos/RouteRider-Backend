const express = require("express");

// se guardan en la variable app todos los metodos de express
const app = express();

// creación de puerto
const port = 3000;

// importa la clase userRoute
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");

app.use(express.json());

// ruta para acceder a la información
app.use('/api/users', userRoute);
app.use('/api/comments', commentRoute);

app.listen(port, () => {console.log("Server is running in http://localhost:" + port)});