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

app.get('/Clubes', async function(req,res){

    try{

        let respuesta;

        if(req.query.id_club != undefined){
            respuesta = await realizarQuery(`
                SELECT * FROM Clubes
                WHERE id_club = ${req.query.id_club}
            `);
        }else{
            respuesta = await realizarQuery(`
                SELECT * FROM Clubes
            `);
        }

        res.send(respuesta);

    }catch(error){
        res.status(500).send(error);
    }

});

app.get('/Estadios', async function(req,res){

    try{

        const respuesta = await realizarQuery(`
            SELECT * FROM Estadios
        `);

        res.send(respuesta);

    }catch(error){
        res.status(500).send(error);
    }

});

app.get('/Socios', async function(req,res){

    try{

        const respuesta = await realizarQuery(`
            SELECT * FROM Socios
        `);

        res.send(respuesta);

    }catch(error){
        res.status(500).send(error);
    }

});

app.post('/Clubes', async function(req,res){

    try{

        console.log("DATOS RECIBIDOS:", req.body);

        await realizarQuery(`
            INSERT INTO Clubes
            (nombre,fecha_fundacion,cant_socios,cant_titulos,tiene_futbol_femenino)
            VALUES
            (
                "${req.body.nombre}",
                "${req.body.fecha_fundacion}",
                ${req.body.cant_socios},
                ${req.body.cant_titulos},
                ${req.body.tiene_futbol_femenino}
            )
        `);

        res.send("Club agregado");

    }catch(error){
        console.error("ERROR SQL:", error);
        res.status(500).send(error);
    }

});

app.delete('/Clubes', async function(req, res){

    try{

        await realizarQuery(`
            DELETE FROM Clubes
            WHERE id_club = ${req.query.id_club}
        `);

        res.send("Club eliminado");

    }catch(error){
        res.status(500).send(error);
    }

});


app.put('/Clubes/:id', async function (req, res) {
    try {
        const { nombre, fecha_fundacion, cant_socios, cant_titulos, tiene_futbol_femenino } = req.body;

        await realizarQuery(`
            UPDATE Clubes 
            SET 
                nombre='${nombre}',
                fecha_fundacion='${fecha_fundacion}',
                cant_socios=${cant_socios},
                cant_titulos=${cant_titulos},
                tiene_futbol_femenino=${tiene_futbol_femenino}
            WHERE id_club=${req.params.id};
        `);

        res.send("Club actualizado");
    } catch (error) {
        res.status(500).send("Error al actualizar club");
    }
});