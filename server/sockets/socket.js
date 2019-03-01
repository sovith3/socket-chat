const { io } = require('../server');
const {Usuarios} = require('../classes/Usuarios');
const {enviarMensaje} = require('../util/utils')

const usuarios = new Usuarios();
io.on('connection', (client) => {

  client.on('entrarChat',(data,callback)=>{

    if(!data.nombre || !data.sala){
        return callback({
            error:true,
            mensaje:'El nombre/sala es requirido'
        })
    }
    

    client.join(data.sala);
    let persona = usuarios.agregarPersona(client.id,data.nombre,data.sala);
    client.broadcast.to(data.sala).emit('listarPersonas',usuarios.getPersonasPorSala(data.sala));
    client.broadcast.to(data.sala).emit('crearMensaje',enviarMensaje('administrador',`${data.nombre} se unio`))
    callback(usuarios.getPersonasPorSala(data.sala));
  })

  client.on('crearMensaje',(data,callback)=>{
    let persona = usuarios.getPersona(client.id);
    let mensaje = enviarMensaje(persona.nombre,data.mensaje);
    client.broadcast.to(persona.sala).emit('crearMensaje',mensaje)
    callback(mensaje);
  });

  client.on('mensajePrivado',(data)=>{
    let persona = usuarios.getPersona(client.id);
    let mensaje = enviarMensaje(persona.nombre,data.mensaje);
    client.broadcast.to(data.para).emit('mensajePrivado',mensaje);
  
  })

  client.on('disconnect',()=>{

    let personaBorrada = usuarios.borrarPersona(client.id);
    client.broadcast.to(personaBorrada.sala).emit('crearMensaje',enviarMensaje('administrador',`${personaBorrada.nombre} salió`))
    client.broadcast.to(personaBorrada.sala).emit('listarPersonas',usuarios.getPersonasPorSala(personaBorrada.sala));
})
});

