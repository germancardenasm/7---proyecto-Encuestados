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
    // se llama funcion para tomar de localStorage las preguntas y respuestas almacenadas si las hay
    this.modelo.recuperarMemoria();
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
          //Validar que se haya ingresado una pregunta.
          if(value == ""){alert("No puede estar vacio el campo de pregunta"); return};
          $('[name="option[]"]').each(function() {
          //Validacion para no agregar respuestas vacias al arreglo de respuestas
            if(this.value!=""){
              respuestas.push({"textoRespuesta":this.value, "cantidad":0});  
            } 
          });
          //Validacion para que el adminsitrador de por lo menos dos opciones al usuario para responder.
          if(respuestas.length < 2){alert("Debe proporcionar al menos dos respuestas."); return};
          //Si se proporciono una pregunta con al menos dos respuestas se agregan al array
          contexto.controlador.agregarPregunta(value, respuestas);
          //Una vez agregadas las preguntas se limpia el formulario para crear una nueva pregunta
          contexto.limpiarFormulario();
          }),

          e.botonBorrarPregunta.click(
            function() {
              //Busca cuel es la pregunta seleccionada para borrar
              var preguntaSeleccionada = $(".list-group-item.active");
              if(preguntaSeleccionada.length==0){alert("Debe seleccionar una pregunta para borrar."); return}
              contexto.controlador.eliminarPregunta(preguntaSeleccionada);
              contexto.limpiarFormulario();
            }),

          e.borrarTodo.click(
            function() {
              contexto.controlador.borrarTodo();
              contexto.limpiarFormulario();
            }),

          e.botonEditarPregunta.click(
              function() {
                var preguntaSeleccionada = $(".list-group-item.active");
                if(preguntaSeleccionada.length==0){alert("Debe seleccionar una pregunta para editar."); return}
                contexto.controlador.editarPregunta(preguntaSeleccionada);
                contexto.limpiarFormulario();
              })
},

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  }
};
