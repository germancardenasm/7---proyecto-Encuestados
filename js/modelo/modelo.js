/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
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
  },

  eliminarPregunta: function(PreguntaAEliminar) {
     
    alert("va a eliminar la pregunta ID: "+ PreguntaAEliminar[0].id);
    for(var i=0; i<this.preguntas.length; i++){
      if(PreguntaAEliminar[0].id==this.preguntas[i].id)
      {
        console.log("El indice de la pregunta a eliminar es: "+ i);
        this.preguntas.splice(i,1,);
      }
    }
    this.preguntaAgregada.notificar();
  },
};
