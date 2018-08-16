/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {

  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  eliminarPregunta: function(pregunta) {
      this.modelo.eliminarPregunta(pregunta);
  },

  borrarTodo: function() {
    this.modelo.borrarTodo();
},
  
  editarPregunta: function(pregunta) {
    this.modelo.editarPregunta(pregunta);
},

  agregarVoto: function(pregunta, respuesta) {
    this.modelo.agregarVoto(pregunta, respuesta);
},



};
