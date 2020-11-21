/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//var datos=require('./datos.json')

var conexionMysql = require('./mysql-connector');

//=======[ Main module code ]==================================================


app.get('/dispositivos', function (req, res, next) {
    console.log("Contenido de body en get dispositivos",req.body)
    conexionMysql.query('Select * from Devices', function (err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }
    console.log("Respuesta del query", respuesta)
        res.send(respuesta);
    });
});

app.get('/dispositivos/:id', function (req, res, next) {
    console.log("Contenido del body by id", req.body);
        conexionMysql.query('Select * from Devices where id=?',[req.params.id],function (err, respuesta) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(respuesta);
        });
});

app.post('/dispositivos/estados', function (req, res, next) {
    console.log("Update body post/dispositivos/estados ->", req.body);
    conexionMysql.query('Update Devices set state=? where id=?', [req.body.state, req.body.id], function (err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send("Se actualizó correctamente: " + JSON.stringify(respuesta)).status(200);
    });
});

app.del('/dispositivos', function (req, res, next) {
    console.log("delete body ->", req.body);
    conexionMysql.query('delete from Devices where id=?', [req.body.id], function (err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(JSON.stringify(respuesta)).status(200);
    });
});

app.put('/dispositivos/:id', function (req, res, next) {
    console.log("Update body post/dispositivos/ ->", req.body);
    conexionMysql.query('Update Devices set state=? where id=?', [req.body.state, req.body.id], function (err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send("Se actualizó correctamente: " + JSON.stringify(respuesta)).status(200);
    });
});

//app.get('/dispositivos/:id', function(req, res, next) {
//    let datosFiltrados= datos.filter((itemDeLaLista)=>{
//        return itemDeLaLista.id==req.params.id
//    })
//
//    res.json(datosFiltrados);


//Espero recibir algo del estilo {id:1,state:1}
//devuelvo el dato modificado. 
//app.post('/dispositivos',function(req,res){
    //let datoFiltrado = datos.filter(item => item.id == req.body.id);
    //if (datoFiltado.lenght>0){
      //          datoFiltrado[0].state =reesq.body.state;
//        }
  //      res.json(datoFiltrado)

    

//});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});
