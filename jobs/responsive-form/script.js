window.onload=function(){
    var numeros = [0,1,2,3,4,5,6,7,8,9];
    var filas = document.getElementsByClassName("fila_numeros");
    for(var i=0; i<10;i++){
        var index = Math.round(Math.random()*(numeros.length -1));
        var num = numeros[index];
        numeros.splice(index,1);
        var nodoNum = document.createElement("span");
        nodoNum.textContent = num;
        nodoNum.setAttribute("onclick","clave("+num+")");
        if(i<=4){
            filas[0].appendChild(nodoNum);
        }else{
            filas[1].appendChild(nodoNum);
        }
    }
}

function clave(n){
    var txt = document.getElementById("clave");
    if(txt.value.length < 5){
        txt.value += n;
    }
}

function solicitatnte(){
    var profesor = document.getElementById("radio1");
    var alumno = document.getElementById("radio2");
    var elementos  = document.getElementsByClassName("fila oculta");
        for(i=0; i<elementos.length;i++){
            elementos[i].style.display = "none";
        }
    if(profesor.checked){
        var departamento = document.getElementById("departamento");
        departamento.style.display="inline";
    }
    if(alumno.checked){
        var facultad = document.getElementById("facultad");
        facultad.style.display="inline";
        var curso = document.getElementById("curso");
        curso.style.display="inline";
    }
}

function validar(){
    if(!validarNIF()){
        control = false;
    }
    if(!validarFecha()){
        control = false;
    }
    if(!validarClave()){
        control = false;
    }
    
    return control;
}

function validarNIF(){
    var control = true;
    
    var expr = /(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))/;
    var elemento = document.formulario.nif;
    elemento.style.border = "none";
    var nif = elemento.value;
    control = expr.test(nif);
    
    if(elemento.nextSibling != null){
        elemento.nextSibling.remove();
    }
    if(!control){
        var err = "DNI no válido";
        if(nif == ""){
            err = "Campo obligatorio";
        }
        elemento.style.border = "solid 2px red";
        elemento.value = null;
        var padre = elemento.parentNode;
        var error = document.createElement("label");
        error.setAttribute("class","error");
        error.textContent = err;
        padre.appendChild(error);
        console.log(nif);
    }
    
    return control;
}

function validarFecha(){
    var control = true;
    
    var expr = /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/;
    var elemento = document.formulario.fecha;
    elemento.style.border = "none";
    var fecha = elemento.value;
    control = expr.test(fecha);
    
    if(elemento.nextSibling != null){
        elemento.nextSibling.remove();
    }
    if(!control){
        var err = "Formato incorrecto";
        if(fecha == ""){
            err = "Campo obligatorio";
        }
        elemento.style.border = "solid 2px red";
        elemento.value = null;
        var padre = elemento.parentNode;
        var error = document.createElement("label");
        error.setAttribute("class","error");
        error.textContent = err;
        padre.appendChild(error);
        console.log(fecha);
    }
    
    return control;
}

function validarClave(){
    var control = true;
    
    
    var elemento = document.formulario.clave;
    elemento.style.border = "none";
    var clave = elemento.value;
    
    control = clave == 9875 ? true : false;
    
    if(elemento.nextSibling != null){
        var errores  = elemento.parentNode.getElementsByClassName("error");
        for(i=0; i<errores.length;i++){
            errores[i].remove();
        }
    }
    if(!control){
        var err = "Clave incorrecta";
        if(clave.length !=5){
            var err = "Se requieren 5 dígitos";
        }
        if(clave == ""){
            err = "Campo obligatorio";
        }
        
        elemento.style.border = "solid 2px red";
        elemento.value = null;
        var padre = elemento.parentNode;
        var error = document.createElement("label");
        error.setAttribute("class","error");
        error.textContent = err;
        padre.appendChild(error);
        console.log(clave);
    }
    
    return control;
}


function limpiar(){
   document.getElementById("formulario").reset();
}