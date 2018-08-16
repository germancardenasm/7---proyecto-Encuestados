/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
      var maximoId = [];
      if (this.preguntas.length > 0){
        for(var i = 0; i<this.preguntas.length; i++){
          maximoId.push(this.preguntas[i].id);
        }
        var elMaximo = Math.max.apply(Math,maximoId);
        return elMaximo;
      }
      return 0; 
    },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("preguntasAlmacenadas",JSON.stringify(this.preguntas));
  },

  recuperarMemoria: function(){
    if(localStorage.getItem("preguntasAlmacenadas")==null){
      console.log("no se ha creado la variable, vamos a crearla");
      localStorage.setItem("preguntasAlmacenadas","");
    }else{
      this.preguntas = JSON.parse(localStorage.getItem("preguntasAlmacenadas"));
    }   
  },

  eliminarPregunta: function(PreguntaAEliminar) {
    
    for(var i=0; i<this.preguntas.length; i++){
      if(PreguntaAEliminar[0].id==this.preguntas[i].id)
      {
        this.preguntas.splice(i,1,);
      }
    }
    this.preguntaAgregada.notificar();
  },

  borrarTodo: function() {  
    this.preguntas=[];
    this.preguntaAgregada.notificar();
  },

  editarPregunta: function(PreguntaAEditar) {
    for(var i=0; i<this.preguntas.length; i++){
      if(PreguntaAEditar[0].id==this.preguntas[i].id)
      {
        this.preguntas[i].textoPregunta = nuevaPregunta;
      }
    }
    this.preguntaAgregada.notificar();
  },

  agregarVoto: function(pregunta, respuesta) {
    for(var i=0; i<this.preguntas.length; i++){
      if(pregunta==this.preguntas[i].textoPregunta)
      {
        for(var j=0; j<this.preguntas[i].cantidadPorRespuesta.length; j++){
          if(this.preguntas[i].cantidadPorRespuesta[j].textoRespuesta == respuesta){
            this.preguntas[i].cantidadPorRespuesta[j].cantidad++;
            this.guardar();
            this.preguntaAgregada.notificar();
            return 0;
          }
        }
      }
    }
  
  },
  
  obtenerPregunta: function(nombrePrespuesta) {
    console.log("si llego");
  },
};
