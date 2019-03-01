
class Usuarios{

    constructor(){

        this.persona = [];
    }

    agregarPersona(id,nombre,sala){

        let persona = {id,nombre,sala};

        this.persona.push(persona);
        
        return this.persona;
    }   


    getPersona(id){

        let persona = this.persona.filter(persona=> persona.id === id)[0];
        
        return persona;

    }
    getPersonas(){
        return this.persona;
    }

    getPersonasPorSala(sala){
        let personasporSala = this.persona.filter(persona =>persona.sala === sala);
        return personasporSala;
    }

    borrarPersona(id){

        let personaBorrada = this.getPersona(id);
        this.persona = this.persona.filter(persona=> persona.id != id)
        return personaBorrada;
        
    }

}

module.exports = {
    Usuarios
}