const express = require('express');
const mongoose = require('mongoose');
const { auth } = require("express-oauth2-jwt-bearer");

require('dotenv').config();

const autenticacion = auth({
    audience: process.env.OAUTH_AUDIENCE,
    issuerBaseURL: process.env.OAUTH_URL,
    tokenSigningAlg: "RS256",
});

mongoose.connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

const app = express();
app.use(express.json());

//Importando el Router libros
const librosRouter = require('./routes/libros');

//Importando el Router de errores
const errorHandler = require('./middlewares/errorHandler');

app.use('/libros', autenticacion, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('servidor escuchando en el puerto 3000')
})