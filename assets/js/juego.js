
const miModulo = (() => {
    'use strict'

    let   deck       = []
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']

    // let puntosJugador     = 0,
    //     puntosComputadora = 0

    let puntoJugadores = []

    // eventos 

    let cambiarPuntosJugador = document.querySelectorAll('small'),
        divCartasJugador = document.querySelectorAll('.divCartas')    

    // referencias html
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo')


    const inicializarJuego = ( numJugadores = 2 ) =>{
        deck = crearDeck()
        puntoJugadores = []
        for(let i = 0; i< numJugadores; i++){
            puntoJugadores.push(0)
        }
        
        cambiarPuntosJugador.forEach( elem => elem.innerText = 0 )
        divCartasJugador.forEach( elem => elem.innerHTML = '')

        btnPedir.disabled = false
        btnDetener.disabled = false
        console.clear()
    } 

    // esta funcio crea un nuevo deck
    const crearDeck = () => {

        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }
        for (let tipo of tipos) {
            for (let espicial of especiales) {
                deck.push(espicial + tipo)
            }
        }
        return _.shuffle(deck)
    }



    // esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay mas cartas en el deck'
        }
        return deck.pop()
    }

  

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1)

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : parseInt(valor)
    }

    // turno 0 es igual al primero y el ultimo siempre es la pc
    const acumularPuntos = ( carta, turno ) =>{

            puntoJugadores[turno] = puntoJugadores[turno] + valorCarta(carta)
            cambiarPuntosJugador[turno].innerText = puntoJugadores[turno]
            return puntoJugadores[turno]
    
   }

   const crearCart = ( carta, turno) =>{

    const imgCarta = document.createElement('img')
    imgCarta.src = `cartas/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugador[turno].append(imgCarta)

   }

   const determinarGanador = () =>{

    const [  puntosMinimos,puntosComputadora ] = puntoJugadores

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('empate')
        } else if (puntosMinimos > 21) {
            alert('la computadora gana')
        } else if (puntosComputadora > 21) {
            alert('el jugador 1 win')
        } else {
            alert('computadora gana')
        }
    }, 100);

   }

    // inteligencia artificial

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0

        do {
            const carta = pedirCarta()
    
            puntosComputadora =  acumularPuntos(carta, puntoJugadores.length -1)

            crearCart(carta, puntoJugadores.length -1 )
  
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


        determinarGanador()


    }

    // eventos 

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta()
        const puntosJugador  = acumularPuntos(carta, 0)


        crearCart(carta,0 )
 

        if (puntosJugador > 21) {
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)
        }

    })

    btnDetener.addEventListener('click', () => {
     
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntoJugadores[0])

    })

    btnNuevo.addEventListener('click', () => {

        inicializarJuego()

    })


    return {
       nuevoJuego: inicializarJuego
    }


})()



