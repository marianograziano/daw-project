var eventos= require('events');

var eventEmitter= new eventos.EventEmitter(); // Objeto faltan defiinir eventos que eventloop escucha


// Faltan crear manejandores

var conexionHandler=function conectado(){
    console.log("Conexion Exitosa");
    //buscar datos
    //Lanzar el evento de datos recibidos
    eventEmitter.emit('datos_recibidos');

}

eventEmitter.on('conexion',conexionHandler); // on sirve para declara que evento va a asociado a que handler. Bindeamos el evento conexion con el handler

eventEmitter.on('datos_recibidos',function(){
    console.log('Llegaron los datos')
    // cambio para el front y devolucion 
});


eventEmitter.emit('conexion'); // emite un evento conexion.- Cae en el event loop -> cuando cae conexion deriva en conexion handler. 

