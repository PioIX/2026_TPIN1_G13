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

// PEDIDOS ADMIN


// gestion palabras
app.get('/Palabras', async function(req,res){

    try{

        let respuesta;

        if(req.query.id_palabra){

            respuesta = await realizarQuery(`
                SELECT *
                FROM Palabras
                WHERE id_palabra = ${req.query.id_palabra}
            `);

        }
        else if(req.query.id_categoria){

            respuesta = await realizarQuery(`
                SELECT *
                FROM Palabras
                WHERE id_categoria = ${req.query.id_categoria}
                ORDER BY palabra
            `);

        }
        else{

            respuesta = await realizarQuery(`
                SELECT *
                FROM Palabras
                ORDER BY id_categoria
            `);

        }

        res.send(respuesta);

    }catch(error){

        res.status(500).send(error);

    }

});


app.post('/Palabras', async function(req,res){

    try{

        console.log("DATOS RECIBIDOS:", req.body);

        await realizarQuery(`
            INSERT INTO Palabras
            (
                id_categoria,
                palabra,
                pista,
                dificultad
            )
            VALUES
            (
                ${req.body.id_categoria},
                '${req.body.palabra}',
                '${req.body.pista}',
                '${req.body.dificultad}'
            )
        `);

        res.send({
            ok:true,
            mensaje:"Palabra agregada"
        });

    }catch(error){

        console.error(error);

        res.status(500).send(error);

    }

});


app.put('/Palabras/:id', async function(req,res){

    try{

        await realizarQuery(`
            UPDATE Palabras
            SET
                id_categoria = ${req.body.id_categoria},
                palabra = '${req.body.palabra}',
                pista = '${req.body.pista}',
                dificultad = '${req.body.dificultad}'
            WHERE id_palabra = ${req.params.id}
        `);

        res.send({
            ok:true,
            mensaje:"Palabra actualizada"
        });

    }catch(error){

        res.status(500).send(error);

    }

});

app.delete('/Palabras', async function(req,res){

    try{

        await realizarQuery(`
            DELETE FROM Palabras
            WHERE id_palabra = ${req.query.id_palabra}
        `);

        res.send({
            ok:true,
            mensaje:"Palabra eliminada"
        });

    }catch(error){

        res.status(500).send(error);

    }

});



//PEDIDOS GESTION DE USERS
app.get('/Usuarios', async function(req,res){

    try{

        let respuesta;

        if(req.query.id_usuario != undefined){

            respuesta = await realizarQuery(`
                SELECT *
                FROM Usuarios
                WHERE id_usuario = ${req.query.id_usuario}
            `);

        }else{

            respuesta = await realizarQuery(`
                SELECT *
                FROM Usuarios
            `);

        }

        res.send(respuesta);

    }catch(error){

        res.status(500).send(error);

    }

});


app.delete('/Usuarios', async function(req,res){

    try{

        await realizarQuery(`
            DELETE FROM Partidas
            WHERE id_usuario = ${req.query.id_usuario}
        `);

        await realizarQuery(`
            DELETE FROM Usuarios
            WHERE id_usuario = ${req.query.id_usuario}
        `);

        res.send({
            ok:true,
            mensaje:"Usuario eliminado"
        });

    }catch(error){

        res.status(500).send(error);

    }

});


// FUNCIONAMIENTO DEL JUEGO
app.get('/PalabraRandom', async function(req,res){

    console.log("ID RECIBIDO:");
    console.log(req.query.id_categoria);

    try{

        const respuesta = await realizarQuery(`

            SELECT *
            FROM Palabras

            WHERE id_categoria = ${req.query.id_categoria}

            ORDER BY RAND()

            LIMIT 1

        `);

        res.send(respuesta[0]);

    }catch(error){

        console.log(error);

        res.status(500).send(error);

    }






});
//PEDIDOS ADMIN GESTION PARTIDAS



app.get('/Partidas', async function(req,res){

    try{

        let respuesta;

        if(req.query.id_partida){

            respuesta = await realizarQuery(`
                SELECT

                    Partidas.id_partida,

                    Usuarios.usuario AS usuario,

                    Palabras.palabra AS palabra,

                    Partidas.resultado,

                    Partidas.puntos_ganados,

                    Partidas.errores,

                    Partidas.uso_pista,

                    Partidas.fecha

                FROM Partidas

                INNER JOIN Usuarios
                    ON Partidas.id_usuario = Usuarios.id_usuario

                INNER JOIN Palabras
                    ON Partidas.id_palabra = Palabras.id_palabra

                WHERE Partidas.id_partida = ${req.query.id_partida}
            `);

        }else{

            respuesta = await realizarQuery(`
                SELECT

                    Partidas.id_partida,

                    Usuarios.usuario AS usuario,

                    Palabras.palabra AS palabra,

                    Partidas.resultado,

                    Partidas.puntos_ganados,

                    Partidas.errores,

                    Partidas.uso_pista,

                    Partidas.fecha

                FROM Partidas

                INNER JOIN Usuarios
                    ON Partidas.id_usuario = Usuarios.id_usuario

                INNER JOIN Palabras
                    ON Partidas.id_palabra = Palabras.id_palabra

                ORDER BY Partidas.fecha DESC
            `);

        }

        res.send(respuesta);

    }catch(error){

        res.status(500).send(error);

    }

});


app.delete('/Partidas', async function(req,res){

    try{

        await realizarQuery(`
            DELETE FROM Partidas
            WHERE id_partida = ${req.query.id_partida}
        `);

        res.send({

            ok:true,

            mensaje:"Partida eliminada"

        });

    }catch(error){

        res.status(500).send(error);

    }

});
