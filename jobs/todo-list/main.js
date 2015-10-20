function ElementoLista(index,texto,cssClass){
    this.index = index;
    this.texto = texto;
    this.cssClass = cssClass;
}

function checkAll(){
    var inputs = document.getElementById("listado").getElementsByTagName("input");
    for(var i=0;i<inputs.length;i++){
        inputs[i].checked = true;
    }
}

function limpiar(){
    var inputs = document.getElementById("listado").getElementsByTagName("input");
    for(var i=0;i<inputs.length;i++){
        inputs[i].checked = false;
    }
}

function editar(element){
    
    var formOculto = element.parentNode.getElementsByClassName("formOculto")[0];
    //se muestra el pop-up
    formOculto.style.display = "block";
    
    //se oscurece el fondo de la pagina. 
    //modalbackground es con color negro de fondo con opacidad diminuida, se encuentra oculto al cargar la pagina
    document.getElementById("modalbackground").style.display = "block";
    
    //se obtine el texto del label seleccionado
    var label= element.parentNode.getElementsByTagName("label")[0];
    var txtAntiguo = label.textContent;
    
    //Se coloca el texto actual en el pop-up
    formOculto.getElementsByClassName("textareaOculto")[0].textContent =txtAntiguo;
   
    /*tarea = prompt("Editar",txtAntiguo);
    if(tarea != null && tarea !=""){
        elemento.textContent = tarea;
        syncList();
    }*/
    
}

function confirmarEditar(element){
    //se obtiene el texto del textarea del pop-up
    var texto = element.parentNode.getElementsByClassName("textareaOculto")[0].value;
   
    var elemento = element.parentNode.parentNode.getElementsByTagName("label")[0];
    console.log("holaaa"+texto);
    if(texto != null && texto !="" && texto.length <=250){
        elemento.textContent = texto;
        syncList();
    }else{
        element.parentNode.getElementsByClassName("textareaOculto")[0].value = elemento.textContent;
        alert("La tarea no puede quedar vacía(puedes eliminarla) y no puede contener mas de 250 caracteres.");
    }
    document.getElementById("modalbackground").style.display = "none";
    element.parentNode.style.display = "none";
    
}

function cancelarEditar(element){
    document.getElementById("modalbackground").style.display = "none";
    element.parentNode.style.display = "none";
}

function eliminar(){
    
   
    var inputs = document.getElementById("listado").getElementsByTagName("input");
    var checkedInputs = new Array();
    for(var i=0;i<inputs.length;i++){
        
        if(inputs[i].checked){
            var input = inputs[i];
            checkedInputs.push(input);
        }
    }
    
     //MENSAJE DE ERROR SI NO HAY NADA SELECCIONADO
    if(checkedInputs.length < 1){
        var mensaje = document.getElementById("errEliminar");
        mensaje.style.display = "block";
        setTimeout(function() {mensaje.style.display="none";}, 3000);
        return;
    }
    
    console.log(checkedInputs);
    for(var i=0;i<checkedInputs.length;i++){
        var padre = checkedInputs[i].parentNode;
        while (padre.firstChild) {
            console.log("Eliminamos el nodo: "+padre.firstChild);
            padre.removeChild(padre.firstChild);
            
        }
        padre.parentNode.removeChild(padre);
    }
    
    syncList();
}

function syncList(){
    localStorage.removeItem("items"); //limpiamos el localStorage
    
    
    var elementos = document.getElementById("listado").getElementsByTagName("li");
    var n_elementos = elementos.length;
    var i = n_elementos - 1; //ultimo elemento
       
    for(var i=0;i<n_elementos;i++){
        var label = elementos[i].getElementsByTagName("label")[0];
        var texto = label.textContent;
        var cssClass = elementos[i].getAttribute("class");
        
          var  elementoLista = new ElementoLista(i,texto,cssClass);
            if(!localStorage.items) //first time 
                {
                    localStorage.items = "[" + JSON.stringify( elementoLista ) + "]";
                }
            else  //there was some data before
                {
                    var historial = JSON.parse(localStorage.items);
                    historial.push(elementoLista);
                    localStorage.items = JSON.stringify(historial);
                    console.log("Añadido:" + JSON.stringify(historial));
                }
    }
}

function formatearTarea(indice,texto,cssClass){
     this.texto = texto;
     this.indice = indice;
     this.cssClass = cssClass;
    
     var lista = document.getElementById("listado");
    
    //NODO ELEMENTO LISTA
    var nodoElemntoLista = document.createElement("li");
    nodoElemntoLista.setAttribute("class",cssClass);
    
    //NODO CHEECKBOX
    var nodoCheckBox = document.createElement("input");
    nodoCheckBox.setAttribute("id","cb"+indice);
    nodoCheckBox.setAttribute("type","checkbox");
    nodoCheckBox.setAttribute("class","checkBox");
    
    //NODO LABEL CONTENEDOR
    var nodoLabelContenedor = document.createElement("div");
    nodoLabelContenedor.setAttribute("class","listado__entrada__contenedor_texto");
   
    //NODO LABEL
    var nodoLabel = document.createElement("label");
    nodoLabel.setAttribute("for","cb"+indice);
    nodoLabel.setAttribute("class","listado__entrada__text");
   // nodoLabel.setAttribute("onclick","editar(this)");
    
    //NODO TEXTO
    var nodoTexto = document.createTextNode(texto);
    
    //NODO BOTON EDITAR
    var nodoEditButton = document.createElement("div");
    nodoEditButton.setAttribute("class","editButton");
    nodoEditButton.setAttribute("onclick","editar(this)");
    
    //NODO FORMULARIO OCULTO 
    var nodoFormOculto = document.createElement("div");
    nodoFormOculto.setAttribute("class","formOculto sombra");
    nodoFormOculto.innerHTML="<textarea class='textareaOculto'></textarea>"
                                +"<div class='form__button' onclick='confirmarEditar(this)'>Confirmar</div>"
                                +"<div class='form__button--rojo' onclick='cancelarEditar(this)'>Cancelar</div>";
    
    //ENLAZAR NODOS
    nodoLabel.appendChild(nodoTexto);
    nodoLabelContenedor.appendChild(nodoLabel);
    nodoElemntoLista.appendChild(nodoCheckBox);
    nodoElemntoLista.appendChild(nodoLabelContenedor);
    nodoElemntoLista.appendChild(nodoEditButton);
    nodoElemntoLista.appendChild(nodoFormOculto);
    lista.appendChild(nodoElemntoLista);
}

function cargar(){
    
    //CARGAR PALETA
    var colores = new Array('rojo', 'naranja', 'amarillo', 'verde', 'azul', 'blanco');
    for(var i=0; i<colores.length; i++){
        var color = colores[i];
        var nodoRadio = document.createElement("input");
        nodoRadio.setAttribute("type", "radio");
        nodoRadio.setAttribute("name", "grupoPaleta");
        nodoRadio.setAttribute("id", "radio"+color);
        nodoRadio.setAttribute("class","radioButton");
        var nodoLabel = document.createElement("label");
        nodoLabel.setAttribute("id",color);
        nodoLabel.setAttribute("class","paleta__color sombra "+color);
        nodoLabel.setAttribute("for","radio"+color);
        var paleta = document.getElementById("paleta");
        paleta.appendChild(nodoRadio);
        paleta.appendChild(nodoLabel);
    }
            
    //CARGAR TAREAS
    if(localStorage.items) 
        {
            var items = JSON.parse(localStorage.items);
            
            for(var i=0; i<items.length; i++){
                formatearTarea(items[i].index, items[i].texto, items[i].cssClass);
            }
        }
}

function guardar(){ //guardar el elemento recien creado al Local Storage
    
    var elementos = document.getElementById("listado").getElementsByTagName("li");
    var n_elementos = elementos.length;
    var i = n_elementos - 1; //ultimo elemento
       

    var label = elementos[i].getElementsByTagName("label")[0];
    var texto = label.textContent;
    var cssClass = elementos[i].getAttribute("class");

    console.log(cssClass);

    var  elementoLista = new ElementoLista(i,texto,cssClass);
    if(!localStorage.items) //first time 
        {
            localStorage.items = "[" + JSON.stringify( elementoLista ) + "]";
        }
    else  //there was some data before
        {
            var historial = JSON.parse(localStorage.items);
            historial.push(elementoLista);
            localStorage.items = JSON.stringify(historial);
            console.log("Añadido:" + JSON.stringify(historial));
        }

    }

function nuevaTarea(){
    
    //MENSAJE DE ERROR SI NO HAY NADA ESCRITO
   if(document.getElementById("form__textarea").value == ""){
        var mensaje = document.getElementById("errNueva");
        mensaje.style.display = "block";
        setTimeout(function() {mensaje.style.display="none";}, 3000);
        return;
    }
    
    //MENSAJE DE ERRIR SI SE SUPERAN 250 CARACTERES
    if(document.getElementById("form__textarea").value.length > 250){
        alert("La tarea no puede superar 250 caracteres");
    }
    
    //DETECTAR RADIOBUTTON SELECCIONADO
    var radios = document.getElementsByClassName("radioButton");
    var rb="";
    for(var i =0; i< radios.length; i++){
        if(radios[i].checked){
            rb = radios[i];
            break;
        }
    }
    if(rb==""){
        alert("Seleccione un color...");
        return;
    }
    //ESTABLECER LA CLASE CSS PARA EL ELEMENTO DE LISTA
    var color=rb.getAttribute("id");
    color = color.substring(5, color.length).toLowerCase();
    console.log(color);
    var cssClass = "listado__entrada sombra "+color;
    
    //TEXTO
    var texto = document.getElementById("form__textarea").value;
    
    //INDICE
    var lista = document.getElementById("listado");
    var indice = lista.getElementsByTagName("input").length;
    
    formatearTarea(indice, texto, cssClass);
    
    guardar();
    
}


function ordenar(){
    
    var orden = new Array('rojo', 'naranja', 'amarillo', 'verde', 'azul', 'blanco');
    var elementosOredenados = new Array;
    
    var elementos = document.getElementById("listado").getElementsByTagName("li");
    var n_elementos = elementos.length;
     
    for(var a=0; a<orden.length;a++){
        
        var color = orden[a];
        
        for(var i=0;i<n_elementos;i++){
            var label = elementos[i].getElementsByTagName("label")[0];
            var texto = label.textContent;
            var cssClass = elementos[i].getAttribute("class");

            if(cssClass.toLowerCase().indexOf(color) != -1){
                elementosOredenados.push(new ElementoLista(i,texto,cssClass));
            }
        }
    }
    
    //limpiamos la lista
    checkAll();
    eliminar();
    
    for(i=0;i<elementosOredenados.length;i++){
        formatearTarea( elementosOredenados[i].index, elementosOredenados[i].texto, elementosOredenados[i].cssClass );
        guardar();
    }
    
}