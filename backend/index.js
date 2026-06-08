var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express();
var port = process.env.PORT || 4000;

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cors());

// Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/*
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
*/

app.get('/Usuarios', async (req, res) => {

    try {

        let respuesta;

        if (req.query.id_usuario != undefined) {

            respuesta = await realizarQuery(`
                SELECT *
                FROM Usuarios
                WHERE id_usuario = ${req.query.id_usuario}
            `);

        } else {

            respuesta = await realizarQuery(`
                SELECT *
                FROM Usuarios
            `);

        }

        res.send(respuesta);

    } catch (error) {
        res.status(500).send(error);
    }

});


/*post usuarios (registro)*/
app.post('/Usuarios', async (req, res) => {

    try {

        const existe = await realizarQuery(`
            SELECT *
            FROM Usuarios
            WHERE usuario = '${req.body.usuario}'
               OR email = '${req.body.email}'
        `);

        if (existe.length > 0) {

            return res.status(400).send({
                /*ok: false,*/
                mensaje: 'El usuario o email ya existe'
            });

        }

        await realizarQuery(`
            INSERT INTO Usuarios
            (
                nombre,
                apellido,
                usuario,
                email,
                contrasena,
                puntaje,
                victorias,
                derrotas,
                partidas_jugadas
            )
            VALUES
            (
                '${req.body.nombre}',
                '${req.body.apellido}',
                '${req.body.usuario}',
                '${req.body.email}',
                '${req.body.contrasena}',
                0,
                0,
                0,
                0
            )
        `);

        res.send({
            /*ok: true,*/
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {

        res.status(500).send(error);

    }

});



app.post('/Login', async (req, res) => {

    try {
        const usuario = await realizarQuery(`
            SELECT *
            FROM Usuarios
            WHERE usuario = '${req.body.usuario}'
              AND contrasena = '${req.body.contrasena}'
        `);

        if (usuario.length === 0) {

            return res.send({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });

        }

        res.send({
            ok: true,
            usuario: usuario[0]
        });

    } catch (error) {

        res.status(500).send(error);

    }

});

//put



//delete

