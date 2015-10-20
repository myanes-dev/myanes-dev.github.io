    window.onload = function () {
        music();
    };

    function jugar(pj) {
        var menu = document.getElementById("mainmenu");
        menu.style.display = "none";
        juego(pj);
    }

    function retry(pj) {
        var final = document.getElementById("final");
        final.style.display = "none";
        juego(pj);
    }

    function mute() {
        var horn = document.getElementById("music");
        if (bg_music.muted) {
            horn.setAttribute("src", "img/horn.png");
            bg_music.muted = false;
        } else {
            horn.setAttribute("src", "img/horn_off.png");
            bg_music.muted = true;
        }

    }

    function music() {
        pop = document.createElement("audio");
        pop.setAttribute('src', 'sounds/pop.mp3');
        pop.volume = 0.7;

        kick = document.createElement("audio");
        kick.setAttribute('src', 'sounds/kick.mp3');
        kick.volume = 1;

        su = document.createElement("audio");
        su.setAttribute('src', 'sounds/cr.mp3');
        su.volume = 1;

        bg_music = document.createElement("audio");
        bg_music.setAttribute('src', 'sounds/bg_music.mp3');
        bg_music.volume = 0.5;
        bg_music.loop = true;
        bg_music.play();
    }

    function juego(pj) {

        var game = {};
        game.ctxBackground = document.getElementById("backgroundCanvas").getContext("2d");
        game.ctxPlayer = document.getElementById("playerCanvas").getContext("2d");
        game.ctxEnemies = document.getElementById("enemiesCanvas").getContext("2d");
        game.ctxItems = document.getElementById("itemsCanvas").getContext("2d");

        game.width = 800;
        game.height = 500;
        game.shoot = false;
        game.over = false;
        game.win = false;

        game.playerImages = [];
        game.enemiesImages = [];
        game.itemsImages = [];
        game.requiredImages = 0;
        game.loadedImages = 0;

        game.keyboard = {};

        game.NUM_FILAS_ENEMIES = 4;
        game.NUM_ENEMIES = 8;
        game.DISTANCIA_ENTRE_ENEMIGOS = 70;
        game.DISTANCIA_ENTRE_FILAS = 65;

        game.palyer = {};
        game.ball = {};
        game.DISTANCIA_INICIAL_PELOTA = 20;
        game.enemies = [];
        game.disparos = [];
        game.VELOCIDAD_DISPAROS = 5;
        game.FRECUENCIA_DISPAROS = 25;
        game.pj = pj;
        //variable global
        tiempo = 0;


        //Cargar las imagenes
        function initImages(players, enemies, items) {
                game.requiredImages = players.length + enemies.length + items.length;
                for (i in players) {
                    var img = new Image;
                    img.src = players[i];
                    game.playerImages[i] = img;
                    game.playerImages[i].onload = function () {
                        game.loadedImages++;
                    }
                }
                for (i in enemies) {
                    var img = new Image;
                    img.src = enemies[i];
                    game.enemiesImages[i] = img;
                    game.enemiesImages[i].onload = function () {
                        game.loadedImages++;
                    }
                }
                for (i in items) {
                    var img = new Image;
                    img.src = items[i];
                    game.itemsImages[i] = img;
                    game.itemsImages[i].onload = function () {
                        game.loadedImages++;
                    }
                }
            }
            //Espera a que se terminen de cargar las images para iniciar el juego.
        function checkImages() {
            if (game.loadedImages >= game.requiredImages) {
                init();
            } else {
                setTimeout(function () {
                    checkImages();
                }, 1);
            }
        }

        //Inicializa todo lo necesario para que el juego comienze
        function init() {
            game.player = {
                x: game.width / 2 - 25,
                y: game.height - 92,
                width: 50,
                height: 82,
                image: game.pj,
                speed: 5
            }

            game.ball = {
                x: game.player.x,
                y: game.player.y - game.DISTANCIA_INICIAL_PELOTA,
                width: 20,
                height: 20,
                image: 0,
                speed: 10
            }

            //filas de enimgos
            for (f = 0; f < game.NUM_FILAS_ENEMIES; f++) {

                //enemigos por fila
                for (i = 0; i < game.NUM_ENEMIES; i++) {
                    var e = i * game.DISTANCIA_ENTRE_ENEMIGOS;
                    var h = f * game.DISTANCIA_ENTRE_FILAS + 20;
                    /* if(i>=6){
                         e=(i-6)*game.DISTANCIA_ENTRE_ENEMIGOS;
                         h=122;
                     }*/
                    game.enemies.push({
                        x: e + 30,
                        y: h,
                        width: 25 + 12.5,
                        height: 41 + 20.5,
                        image: game.pj,
                        speed: 5,
                        count: 0 //para mover los enemigos con la función matematica "Sin"
                    });
                }
            }

            //comienza el juego
            addKeyboardEvents();
            time();
            loop();
        }

        //Logica del juego
        function update() {
            if (!game.over && !game.win) {
                disparar();
                if (game.shoot) {
                    //mover pelota
                    game.ball.y -= game.ball.speed;
                    //DETETAR COLISIONES
                    detectarColisionesPelota();

                    //si la pelota sale del canvas volver a inicio
                    if (game.ball.y < 0) {
                        clearBall();
                        game.ball.y = game.player.y - game.DISTANCIA_INICIAL_PELOTA;
                        game.shoot = false;
                    }
                }

                //hacer que los enemigos disparen de forma aleatoria
                for (i in game.enemies) {
                    var enemy = game.enemies[i];
                    if (aleatorio(0, game.enemies.length * game.FRECUENCIA_DISPAROS) == 4) {
                        enemigosDisparar(enemy);
                    }
                }

                //mover enemigos, jugador y disparos
                moveDisparos();
                moveEnemies();
                movePlayer();

                //¿FIN DEL JUEGO?
                detectarColisionesDisparos();

                if (game.enemies.length == 0) {
                    game.win = true;
                    finDelJuego();
                }

            }
        }

        //Dibuja el juego
        function render() {
            if (!game.over && !game.win) {
                drawPlayer();
                drawEnemies();
                drawDisparos();
                drawBall();
            }
        }

        //Bucle que se repetirá hasta finalizar la ejecución
        function loop() {
            requestAnimFrame(function () {
                loop();
            });
            //si se está jugando
            update();
            render();
        }

        //mover al jugador
        function movePlayer() {
                if (game.keyboard[37]) {
                    game.player.x -= game.player.speed;
                }
                if (game.keyboard[39]) {
                    game.player.x += game.player.speed;
                }

                game.player.x = game.player.x < 0 ? 0 : game.player.x;
                game.player.x = game.player.x > game.width - game.player.width ? game.width - game.player.width : game.player.x;

                //si no se ha disparado mover la pelota con el jugador
                if (!game.shoot) {
                    game.ball.x = game.player.x;
                }

            }
            //mover Enemigos
        function moveEnemies() {
            for (i in game.enemies) {
                var enemigo = game.enemies[i];
                enemigo.count++;
                enemigo.x += Math.sin(enemigo.count * Math.PI / 90) * 3.7;
            }
        }

        //mover disparos        
        function moveDisparos() {
            for (i in game.disparos) {
                var disparo = game.disparos[i];
                disparo.y += game.VELOCIDAD_DISPAROS;
                if (disparo.y > game.height) {
                    game.disparos.splice(i, 1);
                }
            }
            console.log(game.disparos.length);
        }

        //dibujar al jugador
        function drawPlayer() {
            game.ctxPlayer.clearRect(game.player.x - 5,
                game.player.y - 10,
                game.player.width + 10,
                game.player.height + 20
            );
            game.ctxPlayer.drawImage(game.playerImages[game.player.image],
                game.player.x,
                game.player.y,
                game.player.width,
                game.player.height
            );
        }

        //dibujar enemigos
        function drawEnemies() {
            for (i in game.enemies) {
                var enemy = game.enemies[i];
                game.ctxEnemies.clearRect(enemy.x - 5,
                    enemy.y - 10,
                    enemy.width + 10,
                    enemy.height + 20
                );
                game.ctxEnemies.drawImage(game.enemiesImages[enemy.image],
                    enemy.x,
                    enemy.y,
                    enemy.width,
                    enemy.height
                );

            }
        }

        //dibujar disparos
        function drawDisparos() {
            for (i in game.disparos) {
                var disparo = game.disparos[i];
                game.ctxItems.clearRect(disparo.x - 5,
                    disparo.y - 10,
                    disparo.width + 10,
                    disparo.height + 10
                );
                game.ctxItems.drawImage(game.itemsImages[disparo.image],
                    disparo.x,
                    disparo.y,
                    disparo.width,
                    disparo.height
                );
            }
        }

        //dibujar pelota
        function drawBall() {
            game.ctxItems.clearRect(game.ball.x - 5,
                game.ball.y,
                game.ball.width + 10,
                game.ball.height + 10
            );
            game.ctxItems.drawImage(game.itemsImages[game.ball.image],
                game.ball.x,
                game.ball.y,
                game.ball.width,
                game.ball.height
            );
        }

        //limpiar pelota
        function clearBall() {
                game.ctxItems.clearRect(game.ball.x - 5,
                    game.ball.y,
                    game.ball.width + 10,
                    game.ball.height + 10
                );
            }
            //disparar
        function disparar() {
            if (!game.shoot) {
                if (game.keyboard[32]) {
                    //sonido disparo
                    kick.load();
                    kick.play();
                    console.log("disparo");
                    game.shoot = true;
                    game.player.y -= 10;
                    setTimeout(function () {
                        game.player.y += 10;
                    }, 100);
                }
            }
        }

        //Disparos de los enemigos
        function enemigosDisparar(enemigo) {
                game.disparos.push({
                    x: enemigo.x,
                    y: enemigo.y,
                    width: 20,
                    height: 20,
                    image: 1
                });
            }
            //Funcion aleatoria para los disparos
        function aleatorio(a, b) {
            var c = b - a;
            var r = Math.random() * c;
            r = Math.floor(r);
            return parseInt(a) + r;
        }

        //EVENTOS DE TECLADO
        function addKeyboardEvents() {
                addEvent(document, "keydown", function (e) {
                    game.keyboard[e.keyCode] = true;
                });
                addEvent(document, "keyup", function (e) {

                    game.keyboard[e.keyCode] = false;
                });

                function addEvent(element, name, f) {
                    if (element.addEventListener) {
                        //Para la mayoría de navegadores
                        element.addEventListener(name, f, false);
                    } else if (element.attachEvent) {
                        //Para Internet Explorer
                        element.attachEvent(name, f);
                    }
                }
            }
            //Colisiones
        function collision(a, b) {
                var collide = false;
                if (b.x + b.width >= a.x && b.x < a.x + a.width) {
                    if (b.y + b.height >= a.y && b.y < a.y + a.height) {
                        collide = true;
                    }
                }
                if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
                    if (b.y <= a.y && b.y + b.height >= a.y + a.height) {
                        collide = true;
                    }
                }
                if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
                    if (a.y <= b.y && a.y + a.height >= b.y + b.height) {
                        collide = true;
                    }
                }
                return collide;
            }
            //Colisiones con la pelota      
        function detectarColisionesPelota() {
                for (i in game.enemies) {
                    var enemy = game.enemies[i];
                    if (collision(enemy, game.ball)) {
                        //sonido de pop
                        pop.load();
                        pop.play();
                        //eliminar del array al jugador y borar su resto del canvas
                        game.ctxEnemies.clearRect(enemy.x - 5,
                            enemy.y,
                            enemy.width + 10,
                            enemy.height + 10
                        );
                        game.enemies.splice(i, 1);
                        //pelota a la posición inicial y borrar su resto del canvas
                        clearBall();
                        game.ball.y = game.player.y - game.DISTANCIA_INICIAL_PELOTA;
                        game.shoot = false;
                    }
                }
            }
            //colisiones de los disparos con el jugador        
        function detectarColisionesDisparos() {
            for (i in game.disparos) {
                var disparo = game.disparos[i];
                if (collision(disparo, game.player)) {
                    //Borrar al jugador
                    game.ctxPlayer.clearRect(game.player.x - 5,
                        game.player.y,
                        game.player.width + 10,
                        game.player.height + 10
                    );
                    //Si hay colision, fin del juego
                    console.log("uuu te dieron");
                    game.over = true;
                    finDelJuego();
                }
            }

        }

        //Puntuacion, tiempo del juego
        function time() {
            if (!game.over && !game.win) {
                tiempo++;
                document.getElementById("time").textContent = tiempo;
                setTimeout(function () {
                    time();
                }, 1000);
            }
        }

        //FIN DEL JUEGO
        function finDelJuego() {

            //borar canvas
            game.ctxEnemies.clearRect(0, 0, game.width, game.height);
            game.ctxItems.clearRect(0, 0, game.width, game.height);
            game.ctxPlayer.clearRect(0, 0, game.width, game.height);
            //sonido game over
            su.load();
            su.play();
            //mostrar final
            document.getElementById("final").style.display = "block";
            if (game.pj == 0) {
                document.getElementById("img_fin").setAttribute("src", "img/player_cr.png");
            } else {
                document.getElementById("img_fin").setAttribute("src", "img/player_m.png");
            }
            //texto game over o game win
            if (game.over) {
                var txt = document.getElementById("txt_fin");
                txt.textContent = "Game Over";
                txt.style.color = "red";
                //ocultar elementos de victoria
                document.getElementById("tiempo_fin").style.display = "none";
                document.getElementById("result_fin").style.display = "none";
                document.getElementById("txtAlias_fin").style.display = "none";
                document.getElementById("save").style.display = "none";
                //mostrar imagen derrota
                document.getElementById("jaja").style.display = "block";
                //mostrar boton home
                document.getElementById("home").style.display = "inline";
            } else if (game.win) {
                var txt = document.getElementById("txt_fin");
                txt.textContent = "Winner";
                txt.style.color = "Yellow";
                //mostrar elementos de victoria
                document.getElementById("tiempo_fin").style.display = "inline";
                document.getElementById("txtAlias_fin").style.display = "inline";
                document.getElementById("save").style.display = "inline";
                document.getElementById("save").setAttribute("onclick", "guardar()");

                //ocultar imagen derrota
                document.getElementById("jaja").style.display = "none";
                //ocultar boton home
                document.getElementById("home").style.display = "none";
                //puntuacion, timepo
                document.getElementById("tiempo_fin").textContent = tiempo;


                //record???
                var top = ordenarTOP();
                top = top[0].tiempo;
                if (tiempo < top) {
                    document.getElementById("result_fin").style.display = "inline";
                } else {
                    document.getElementById("result_fin").style.display = "none";
                }
            }
            document.getElementById("retry").setAttribute("onclick", "retry(" + game.pj + ")");


        }




        //EJECUCION MANUAL       
        initImages(["img/player_cr.png", "img/player_m.png"], ["img/player_m.png", "img/player_cr.png"], ["img/ball_hd.png", "img/red_ball.png"]);
        checkImages();
    }

    //Guardar restltador
    function guardar() {
        var alias = document.getElementById("txtAlias_fin").value;
        var puntuacion = tiempo;
        var registro = {
            alias: alias,
            tiempo: puntuacion
        }
        if (localStorage.puntuaciones) {
            var scores = JSON.parse(localStorage.puntuaciones);
            scores.push(registro);
            localStorage.puntuaciones = JSON.stringify(scores);
        } else {
            var scores = [];
            scores.push(registro);
            localStorage.puntuaciones = JSON.stringify(scores);
        }
        console.log("guardado el registro");
        location.reload();
    }


    function ordenarTOP() {
        var top = localStorage.puntuaciones;
        top = JSON.parse(top);
        top = top.sort(function (a, b) {
            return parseFloat(a.tiempo) - parseFloat(b.tiempo)
        });
        return top;
    }

    function ranking() {
        document.getElementById("mainmenu").style.display = "none";
        document.getElementById("ranking").style.display = "block";
        var ranking = ordenarTOP();
        var table = document.createElement('table');
        table.setAttribute("class", "ranking_table");
        var tr0 = document.createElement('tr');
        var th1 = document.createElement('td');
        var th2 = document.createElement('td');
        var th3 = document.createElement('td');
        var t1 = document.createTextNode('#');
        var t2 = document.createTextNode('ALIAS');
        var t3 = document.createTextNode('TIME');

        th1.appendChild(t1);
        th2.appendChild(t2);
        th3.appendChild(t3);
        tr0.appendChild(th1);
        tr0.appendChild(th2);
        tr0.appendChild(th3);

        table.appendChild(tr0);

        for (var i = 0; i < 10; i++) {
            var tr = document.createElement('tr');
            var td0 = document.createElement('td');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var text0 = document.createTextNode(i + 1);
            if (i < ranking.length) {
                var text1 = document.createTextNode(ranking[i].alias);
                var text2 = document.createTextNode(ranking[i].tiempo);
            } else {
                var text1 = document.createTextNode("-");
                var text2 = document.createTextNode("-");
            }

            td0.appendChild(text0);
            td1.appendChild(text1);
            td2.appendChild(text2);
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);

            table.appendChild(tr);
        }
        document.getElementById("ranking_table_wrapper").appendChild(table);

    }

    function controls() {
        document.getElementById("mainmenu").style.display = "none";
        document.getElementById("controls").style.display = "block";
    }

    function goHome() {
        location.reload();
    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (calback) {
                window.setTimeout(calback, 1000 / 60);
            };
    })();