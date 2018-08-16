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
    console.log("si guardo?: ");
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

  sumarVoto: function(pregunta, respuesta) {
    for(var i=0; i<this.preguntas.length; i++){
      if(pregunta[0].id==this.preguntas[i].id)
      {
        for(var j=0; j<preguntas[i].cantidadPorRespuesta.length; j++){
          if(preguntas[i].cantidadPorRespuesta[j].textoRespuesta == respuesta){
            preguntas[i].cantidadPorRespuesta[j].cantidad++;
          }
        }
      }
    }
    this.preguntaAgregada.notificar();
  },
  

};
