/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
      laNuevaLista = document.createElement("li");
      nuevoItem = $(laNuevaLista);
      nuevoItem.addClass("list-group-item");
      nuevoItem.attr("id",pregunta.id);
      nuevoItem.text(pregunta.textoPregunta);
      var interiorItem = $('.d-flex');
      var titulo = interiorItem.find('h5');
      titulo.text(pregunta.textoPregunta);
      interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
        return " " + resp.textoRespuesta;
      }));
      nuevoItem.html($('.d-flex').html());
      return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;
    //asociacion de eventos a boton
        e.botonAgregarPregunta.click(
          function() {
          var value = e.pregunta.val();
          var respuestas = [];

          $('[name="option[]"]').each(function() {
            //completar
            respuestas.push({"textoRespuesta":this.value, "cantidadPorRespuesta":0});  
          });
          contexto.controlador.agregarPregunta(value, respuestas);
          contexto.limpiarFormulario();
          }),

          e.botonBorrarPregunta.click(
            function() {
            var preguntaSeleccionada = $(".list-group-item.active");
            contexto.modelo.eliminarPregunta(preguntaSeleccionada);
            //var indice = preguntas.indexOf(preguntaSeleccionada);
            //alert(indice);
            $('[name="option[]"]').each(function() {
              //completar
              //respuestas.push({"textoRespuesta":this.value, "cantidadPorRespuesta":0});  
            });
            contexto.limpiarFormulario();
            
            })
    //asociar el resto de los botones a eventos
  
},

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  }
};
