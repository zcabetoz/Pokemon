pokemones = []
let pokemonesEnemigos = []
let jugadorId = null
let enemigoId = null
let opcionDePokemones

let victoriasJugador = 0
let victoriasEnemigo = 0

let divBulbasaur
let inputBulbasaur

let divJigglypuff
let inputJigglypuff

let divPicachu
let inputPicachu

let divSquirtle
let inputSquirtle

let btnAgua
let btnFuego
let btnTierra
let btnElectricidad

let botones = []
let ataqueJugador = []
let ataquesPokemon
let ataquesPokemonEnemigo
let ataqueEnemigo = []
let ataqueEnemigoAleatorio

let indexAtaqueJugador
let indexAtaqueEnemigo

let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'assets/mapa.jpg'

let nombrePokemonJugador
let obtenerPokemonObjeto

let alturaDeseada
let anchoMapa = window.innerWidth - 20

const anchoMaximo = 800

if (anchoMapa > anchoMaximo) {
    anchoMapa = anchoMaximo - 20
}

alturaDeseada = anchoMapa * 600 / 800

class Pokemon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataque = []
        this.width = 85
        this.height = 85
        this.x = aleatorio(0, anchoMapa - this.width)
        this.y = aleatorio(0, alturaDeseada - this.height)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadY = 0
        this.velocidadX = 0
    }

    pintarPokemon() {
        let mapa = document.getElementById('mapa')
        let lienzo = mapa.getContext("2d")
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let picachu = new Pokemon('picachu', 'assets/picachu.jpg', 5, 'assets/picachu.jpg');
let bulbasaur = new Pokemon('bulbasaur', 'assets/bulbasaur.jpg', 5, 'assets/bulbasaur.jpg');
let squirtle = new Pokemon('squirtle', 'assets/squirtle.jpg', 5, 'assets/squirtle.jpg');
let jigglypuff = new Pokemon('jigglypuff', 'assets/jigglypuff.jpg', 5, 'assets/jigglypuff.jpg');

const PICACHU_ATAQUES = [
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'}
]

const BULBASAUR_ATAQUES = [
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'}
]

const SQUIRTLE_ATAQUES = [
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🔥', id: 'btn-fuego'}
]

const JIGGLYPUFF_ATAQUES = [
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'}
]

picachu.ataque.push(...PICACHU_ATAQUES)

bulbasaur.ataque.push(...BULBASAUR_ATAQUES)

squirtle.ataque.push(...SQUIRTLE_ATAQUES)

jigglypuff.ataque.push(...JIGGLYPUFF_ATAQUES)

pokemones.push(picachu, squirtle, bulbasaur, jigglypuff)

function iniciarJuego() {
    const sectionVerMapa = document.getElementById('ver-mapa')
    sectionVerMapa.style.display = 'none'
    const contenedorPokemon = document.getElementById('contenedor-pokemon')
    pokemones.forEach((pokemon) => {
        opcionDePokemones = `
             <div id="div-${pokemon.nombre}">
                <input type="radio" name="pokemon" id=${pokemon.nombre}>
                <label class="tarjeta-de-pokemon" for=${pokemon.nombre}>
                    <p>${pokemon.nombre}</p>
                    <img src=${pokemon.foto} alt=${pokemon.nombre}>
                </label>
            </div>
        `
        contenedorPokemon.innerHTML += opcionDePokemones

        divPicachu = document.getElementById("div-picachu")
        inputPicachu = document.getElementById("picachu")

        divBulbasaur = document.getElementById("div-bulbasaur")
        inputBulbasaur = document.getElementById("bulbasaur")

        divSquirtle = document.getElementById("div-squirtle")
        inputSquirtle = document.getElementById("squirtle")

        divJigglypuff = document.getElementById('div-jigglypuff')
        inputJigglypuff = document.getElementById('jigglypuff')
    })

    divJigglypuff.addEventListener('click', mostrarJigglypuff)
    divSquirtle.addEventListener('click', mostrarSquirtle)
    divBulbasaur.addEventListener('click', mostrarBulbasaur)
    divPicachu.addEventListener('click', mostrarPicachu)

    let btnPokemonJugador = document.getElementById('btn-seleccionar-pokemon')
    btnPokemonJugador.addEventListener('click', seleccionarPokemonJugador)

    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataques')
    seccionSeleccionarAtaque.style.display = 'none'
    let btnReiniciar = document.getElementById('btn-reiniciar')
    btnReiniciar.addEventListener('click', reiniciarJuego)
    btnReiniciar.style.display = 'none'
    btnPokemonJugador.disabled = true
    btnPokemonJugador.style.background = 'gray'

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text().then(function (respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
            }
        })
}

function mostrarJigglypuff() {

    let btnAtras = document.getElementById('btn-atras')
    let btnSeleccionarPokemon = document.getElementById('btn-seleccionar-pokemon')
    divPicachu.style.display = 'none'
    divBulbasaur.style.display = 'none'
    divSquirtle.style.display = 'none'
    btnSeleccionarPokemon.disabled = false
    btnSeleccionarPokemon.style.background = 'transparent'
    btnAtras.style.display = 'block'
    btnAtras.addEventListener('click', reiniciarJuego)

}

function mostrarPicachu() {
    let btnAtras = document.getElementById('btn-atras')
    let btnSeleccionarPokemon = document.getElementById('btn-seleccionar-pokemon')
    divJigglypuff.style.display = 'none'
    divSquirtle.style.display = 'none'
    divBulbasaur.style.display = 'none'
    btnSeleccionarPokemon.disabled = false
    btnSeleccionarPokemon.style.background = 'transparent'
    btnAtras.style.display = 'block'
    btnAtras.addEventListener('click', reiniciarJuego)
}

function mostrarSquirtle() {
    let btnAtras = document.getElementById('btn-atras')
    let btnSeleccionarPokemon = document.getElementById('btn-seleccionar-pokemon')
    divJigglypuff.style.display = 'none'
    divPicachu.style.display = 'none'
    divBulbasaur.style.display = 'none'
    btnSeleccionarPokemon.disabled = false
    btnSeleccionarPokemon.style.background = 'transparent'
    btnAtras.style.display = 'block'
    btnAtras.addEventListener('click', reiniciarJuego)
}

function mostrarBulbasaur() {
    let btnAtras = document.getElementById('btn-atras')
    let btnSeleccionarPokemon = document.getElementById('btn-seleccionar-pokemon')
    divJigglypuff.style.display = 'none'
    divSquirtle.style.display = 'none'
    divPicachu.style.display = 'none'
    btnSeleccionarPokemon.disabled = false
    btnSeleccionarPokemon.style.background = 'transparent'
    btnAtras.style.display = 'block'
    btnAtras.addEventListener('click', reiniciarJuego)

}

function seleccionarPokemonJugador() {
    let divImagenPokemon = document.getElementById('imagen-pokemon')
    let imagenPokemon
    let sectionVerMapa = document.getElementById('ver-mapa')
    let seccionSeleccionarPokemon = document.getElementById('seleccionar-pokemon')
    let spanPokemonJugador = document.getElementById('pokemon-jugador')
    if (inputPicachu.checked) {
        nombrePokemonJugador = inputPicachu.id
    } else if (inputJigglypuff.checked) {
        nombrePokemonJugador = inputJigglypuff.id
    } else if (inputSquirtle.checked) {
        nombrePokemonJugador = inputSquirtle.id
    } else if (inputBulbasaur.checked) {
        nombrePokemonJugador = inputBulbasaur.id
    }
    spanPokemonJugador.innerHTML = nombrePokemonJugador[0].toUpperCase() + nombrePokemonJugador.slice(1)
    imagenPokemon = `<img id = "imagen-pokemon" src="assets/${nombrePokemonJugador}.jpg" alt=${nombrePokemonJugador.nombre}>`
    divImagenPokemon.innerHTML = imagenPokemon
    extraerAtaques(nombrePokemonJugador)
    seccionSeleccionarPokemon.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    seleccionarPokemon(nombrePokemonJugador)
    iniciarMapa()
}

function seleccionarPokemon(nombrePokemonJugador) {
    fetch(`http://localhost:8080/pokemon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pokemon: nombrePokemonJugador
        })
    })
}

function extraerAtaques(nombrePokemonJugador) {
    let ataques
    for (let i = 0; i < pokemones.length; i++) {
        if (nombrePokemonJugador === pokemones[i].nombre) {
            ataques = pokemones[i].ataque
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    const contenedorAtaques = document.getElementById('contenedor-ataques')
    ataques.forEach((ataque) => {
        ataquesPokemon = `
            <button id=${ataque.id} class="btn-ataques btnAtaques">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesPokemon
    })

    btnAgua = document.getElementById('btn-agua')
    btnFuego = document.getElementById('btn-fuego')
    btnTierra = document.getElementById('btn-tierra')
    btnElectricidad = document.getElementById('btn-electricidad')
    botones = document.querySelectorAll('.btnAtaques')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#B2A4FF'
                console.log(ataqueJugador)
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                boton.style.background = '#B2A4FF'
                console.log(ataqueJugador)
                boton.disabled = true
            } else if (e.target.textContent === '🌱') {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#B2A4FF'
                console.log(ataqueJugador)
                boton.disabled = true
            } else {
                ataqueJugador.push('ELECTRICIDAD')
                boton.style.background = '#B2A4FF'
                console.log(ataqueJugador)
                boton.disabled = true
            }
            if (ataqueJugador.length === 6) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/pokemon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
     intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques(){
    fetch(`http://localhost:8080/pokemon/${enemigoId}/ataquesEnemigo`)
        .then(function (res){
            if(res.ok){
                res.json()
                    .then(function ({ataques}){
                        if(ataques.length === 6){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}
function seleccionarPokemonEnemigo(enemigo) {
    let divImagenEnemigo = document.getElementById('imagen-enemigo')
    let imagenEnemigo
    let spanPokemonEnemigo = document.getElementById('pokemon-enemigo')
    let nombrePokemonEnemigo = enemigo.nombre
    spanPokemonEnemigo.innerHTML = nombrePokemonEnemigo[0].toUpperCase() + nombrePokemonEnemigo.slice(1)
    imagenEnemigo = `<img id = "imagen-enemigo" src=${enemigo.foto} alt=${enemigo.nombre}>`
    divImagenEnemigo.innerHTML = imagenEnemigo
    ataquesPokemonEnemigo = enemigo.ataque
    secuenciaAtaque()
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)
    let spanVidasJugador = document.getElementById('vidas-pokemon-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-pokemon-enemigo')

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)
            crearMensaje('EMPATE')

        } else if ((ataqueJugador[i] === 'TIERRA' && ataqueEnemigo[i] === 'AGUA') || (ataqueJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO') ||
            (ataqueJugador[i] === 'ELECTRICIDAD' && ataqueEnemigo[i] === 'AGUA') || (ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA')) {
            indexAmbosOponentes(i, i)
            victoriasJugador++
            crearMensaje('GANASTE')
            spanVidasJugador.innerHTML = victoriasJugador.toString()
        } else {
            indexAmbosOponentes(i, i)
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo.toString()
            crearMensaje('PERDISTE')
        }
    }
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Empate')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Ganaste la batalla!!!')
    } else {
        crearMensajeFinal('Perdiste la batalla!!!')
    }
}

function crearMensaje(resultadoCombate) {
    let sectionMensajes = document.getElementById('resultado')
    let ataquesDelJugador = document.getElementById('ataques-del-jugador')
    let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultadoCombate
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    if (resultadoFinal) {
        let btnSeleccionar = document.getElementById('btn-seleccionar-pokemon')
        let btnReiniciar = document.getElementById('btn-reiniciar')
        let sectionMensajes = document.getElementById('resultado')
        sectionMensajes.innerHTML = resultadoFinal
        btnSeleccionar.disabled = true
        btnReiniciar.style.display = 'block'
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reiniciarJuego() {
    location.reload()
}

function pintarCanvas() {
    let mapa = document.getElementById('mapa')
    let lienzo = mapa.getContext("2d")
    obtenerPokemonObjeto.y = obtenerPokemonObjeto.y + obtenerPokemonObjeto.velocidadY
    obtenerPokemonObjeto.x = obtenerPokemonObjeto.x + obtenerPokemonObjeto.velocidadX
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    obtenerPokemonObjeto.pintarPokemon()
    enviarPosicion(obtenerPokemonObjeto.x, obtenerPokemonObjeto.y)
    pokemonesEnemigos.forEach(function (pokemonEnemigo) {
            pokemonEnemigo.pintarPokemon()
            revisarColision(pokemonEnemigo)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/pokemon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({enemigos}) {
                        pokemonesEnemigos = enemigos.map(function (enemigo) {
                            let pokemonEnemigo = null
                                const pokemonNombre = enemigo.pokemon.nombre || ""
                                if (pokemonNombre === 'picachu') {
                                    pokemonEnemigo = new Pokemon('picachu', 'assets/picachu.jpg', 5, 'assets/picachu.jpg', enemigo.id)
                                } else if (pokemonNombre === 'bulbasaur') {
                                    pokemonEnemigo = new Pokemon('bulbasaur', 'assets/bulbasaur.jpg', 5, 'assets/bulbasaur.jpg', enemigo.id);
                                } else if (pokemonNombre === 'squirtle') {
                                    pokemonEnemigo = new Pokemon('squirtle', 'assets/squirtle.jpg', 5, 'assets/squirtle.jpg', enemigo.id);
                                } else {
                                    pokemonEnemigo = new Pokemon('jigglypuff', 'assets/jigglypuff.jpg', 5, 'assets/jigglypuff.jpg', enemigo.id);
                                }
                                pokemonEnemigo.x = enemigo.x
                                pokemonEnemigo.y = enemigo.y
                            return pokemonEnemigo
                        })
                    })
            }
        })
}

function obtenerPokemon() {
    for (let i = 0; i < pokemones.length; i++) {
        if (nombrePokemonJugador === pokemones[i].nombre) {
            return pokemones[i]
        }
    }
}

function moverRight() {
    obtenerPokemonObjeto.velocidadX = 5
}

function moverLeft() {
    obtenerPokemonObjeto.velocidadX = -5
}

function moverUp() {
    obtenerPokemonObjeto.velocidadY = -5
}

function moverDown() {
    obtenerPokemonObjeto.velocidadY = 5

}

function detenerMovimiento() {
    obtenerPokemonObjeto.velocidadY = 0
    obtenerPokemonObjeto.velocidadX = 0
}

function sePresionoTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverUp()
            break
        case 'ArrowDown':
            moverDown()
            break
        case 'ArrowRight':
            moverRight()
            break
        case 'ArrowLeft':
            moverLeft()
            break
        default:
            break
    }
}

function iniciarMapa() {
    let mapa = document.getElementById('mapa')
    mapa.width = anchoMapa
    mapa.height = alturaDeseada

    obtenerPokemonObjeto = obtenerPokemon()
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function revisarColision(enemigo) {
    let seccionVerMapa = document.getElementById('ver-mapa')
    let seccionSeleccionarAtaques = document.getElementById('seleccionar-ataques')
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.height
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.width

    const arribaPokemon = obtenerPokemonObjeto.y
    const abajoPokemon = obtenerPokemonObjeto.y + obtenerPokemonObjeto.height
    const izquierdaPokemon = obtenerPokemonObjeto.x
    const derechaPokemon = obtenerPokemonObjeto.x + obtenerPokemonObjeto.width

    if (
        abajoPokemon < arribaEnemigo ||
        arribaPokemon > abajoEnemigo ||
        derechaPokemon < izquierdaEnemigo ||
        izquierdaPokemon > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    seccionSeleccionarAtaques.style.display = 'flex'
    seccionVerMapa.style.display = 'none'
    seleccionarPokemonEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)