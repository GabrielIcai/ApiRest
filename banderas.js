let BanderaPais = {};
let puntuacion = 0;
let highscore=0;
let paisCorrecto; 


mostrarbandera();

function mostrarbandera() {
    fetch("https://restcountries.com/v3.1/all")
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                throw respuesta.status;
            }
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let flag = data[i].flags.png;
                let pais = data[i].name.common;
                BanderaPais[pais] = flag;
            }
            
            Botones();
        })
        .catch(error => {
            console.error('Error al obtener datos de países:', error);
        });
}

function Botones() {
    document.getElementById('Puntuacion').textContent = "Score: "+puntuacion;
    const paises = Object.keys(BanderaPais);
    const paisAleatorio = paises[Math.floor(Math.random() * paises.length)];
    const banderaAleatoria = BanderaPais[paisAleatorio];
    const boton1 = document.getElementById('boton1');
    const boton2 = document.getElementById('boton2');
    const boton3 = document.getElementById('boton3');
    const boton4 = document.getElementById('boton4');
    const botones = [boton1, boton2, boton3, boton4];
    const indiceRespuestaCorrecta = Math.floor(Math.random() * 4);
    
   
    paisCorrecto = paisAleatorio;

    for (let i = 0; i < 4; i++) {
        const indicePais = (indiceRespuestaCorrecta + i) % 4; 
        const boton = botones[i];
        if (i === indiceRespuestaCorrecta) {
            botones[i].textContent = paisCorrecto; 
        } else {
            let otroPais;
            do {
                otroPais = paises[Math.floor(Math.random() * paises.length)];
            } while (otroPais === paisCorrecto);
            boton.textContent = otroPais;
        }
    }

    document.getElementById("bandera").src = banderaAleatoria; 

    
    boton1.removeEventListener('click', verificarRespuesta);
    boton2.removeEventListener('click', verificarRespuesta);
    boton3.removeEventListener('click', verificarRespuesta);
    boton4.removeEventListener('click', verificarRespuesta);

    
    boton1.addEventListener('click', verificarRespuesta);
    boton2.addEventListener('click', verificarRespuesta);
    boton3.addEventListener('click', verificarRespuesta);
    boton4.addEventListener('click', verificarRespuesta);
}

function verificarRespuesta(event) {
    const boton = event.target;
    const paisClicado = boton.textContent;
    if (paisClicado === paisCorrecto) {
        puntuacion++;
        console.log('Deberia Actualizar')
    } else {
        console.log('Respuesta incorrecta');
        const tryAgainContainer = document.getElementById('try-again-container');
        tryAgainContainer.classList.remove('hidden'); 
        const tryAgainButton = document.getElementById('try-again-button');
        const puntuacion2=document.getElementById('puntos');
        puntuacion2.textContent=puntuacion;
        if(puntuacion>highscore){
            highscore=puntuacion;
        }
        const record=document.getElementById("mejorpuntuacion")
        record.textContent = "Highscore: " + highscore;
        console.log(highscore)
        tryAgainButton.addEventListener('click', function() {
            tryAgainContainer.classList.add('hidden')    
        }
        );
        puntuacion=0;
    }
    mostrarbandera();
}