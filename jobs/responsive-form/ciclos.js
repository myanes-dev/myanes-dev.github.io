
//[0] --> medio
//[1-3] --> presencial
//[4-6] --> semipresencial
var ciclos= ["SMR","ASIR","DAM","DAW","SMR","ASIR","DAM"];

//TENERIFE
var rambla = [1,0,0,0,0,0,0];
var cruz = [0,1,0,1,0,1,1];
var domingo = [1,1,1,0,0,0,0];
var cesar = [1,1,1,1,1,1,1];
var ana = [1,0,0,0,0,0,0];
var galletas = [0,1,0,0,0,0,1];
var adeje = [1,0,0,0,0,0,0];

//LA PALMA
var villa = [1,0,0,0,0,0,0];
var maria = [0,1,0,0,0,0,0];


function actualizarDatos(){
    var lis = document.getElementById("resultado").getElementsByTagName("li");
    for(i=0;i<lis.length;i++){
        lis[i].style.display = "none";
    }
    
    var rango = [0,1,2,3,4,5,6];
    var validos = [];
    var hayciclos = false;
    //filtro modalidad
    var presencial = document.getElementById("radio1").checked;
    var semi = document.getElementById("radio2").checked;
    if((presencial && semi) || (!presencial && !semi)){
        console.log("Presencial y semi");
    }else if(presencial && !semi){
        console.log("presenciales solos");
        rango = [0,1,2,3];
    }else if(!presencial && semi){
        console.log("semipresenciales solos");
        rango = [0,4,5,6];
    }
    //filtro nivel
    var medio = document.getElementById("cb1").checked;
    var superior = document.getElementById("cb2").checked;
    if((medio && superior) || (!medio && !superior)){
        console.log("medios y superiores");
    }else if(!medio){
        console.log("solo superiores");
        rango.splice(0,1);
    }
    //filtro ciclos
    var ciclo1 = document.getElementById("ciclo1").checked;
    var ciclo2 = document.getElementById("ciclo2").checked;
    var ciclo3 = document.getElementById("ciclo3").checked;
    var ciclo4 = document.getElementById("ciclo4").checked;
    if(ciclo1 || ciclo2 || ciclo3 || ciclo4){
        hayciclos = true;
        if(ciclo1){
        validos.push("SMR");
        }
        if(ciclo2){
            validos.push("ASIR");
        }
        if(ciclo3){
            validos.push("DAM");
        }
        if(ciclo4){
            validos.push("DAW");
        }
    }
    
    //filtro resultados
    var rambla_bol = false;
    var cruz_bol = false;
    var domingo_bol = false;
    var cesar_bol = false;
    var ana_bol = false;
    var galletas_bol = false;
    var adeje_bol = false;
    
    var villa_bol = false;
    var maria_bol = false;
    if(hayciclos){
        for(var i = 0; i < rango.length; i++){
            //ies rambla
            if(rambla[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        rambla_bol = true;
                    }
                }
                if(rambla_bol){
                    var li = document.getElementById("rambla");
                    li.style.display="block";
                }
            }
            //ies cruz
            if(cruz[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        cruz_bol = true;
                    }
                }
                if(cruz_bol){
                    var li = document.getElementById("cruz");
                    li.style.display="block";
                }
            }
            //ies domingo
            if(domingo[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        domingo_bol = true;
                    }
                }
                if(domingo_bol){
                    var li = document.getElementById("domingo");
                    li.style.display="block";
                }
            }
            //ies cesar
            if(cesar[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        cesar_bol = true;
                    }
                }
                if(cesar_bol){
                    var li = document.getElementById("cesar");
                    li.style.display="block";
                }
            }
            //ies ana
            if(ana[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        ana_bol = true;
                    }
                }
                if(ana_bol){
                    var li = document.getElementById("ana");
                    li.style.display="block";
                }
            }
            //ies galletas
            if(galletas[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        galletas_bol = true;
                    }
                }
                if(galletas_bol){
                    var li = document.getElementById("galletas");
                    li.style.display="block";
                }
            }
            //ies adeje
            if(adeje[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        adeje_bol = true;
                    }
                }
                if(adeje_bol){
                    var li = document.getElementById("adeje");
                    li.style.display="block";
                }
            }
            
            
            //ies villa
            if(villa[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        villa_bol = true;
                    }
                }
                if(villa_bol){
                    var li = document.getElementById("villa");
                    li.style.display="block";
                }
            }
            //ies maria
            if(cruz[rango[i]]==1){
                for(var e=0; e<validos.length; e++){
                    if(ciclos[rango[i]] == validos[e]){
                        maria_bol = true;
                    }
                }
                if(maria_bol){
                    var li = document.getElementById("maria");
                    li.style.display="block";
                }
            }
            
        
        }
    }
    
}