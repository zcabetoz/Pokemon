pokemones = []

let opcionDePokemones
let vidasJugador = 5
let vidasEnemigo = 5

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

class Pokemon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataque = []
    }

}

let picachu = new Pokemon('picachu', 'assets/picachu.jpg', 3);
let bulbasaur = new Pokemon('bulbasaur', 'assets/Bulbasaur.jpg', 3);
let squirtle = new Pokemon('squirtle', 'assets/Squirtle.jpg', 3);
let jigglypuff = new Pokemon('jigglypuff', 'assets/Jigglypuff.jpg', 3);


picachu.ataque.push(
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'},
)
bulbasaur.ataque.push(
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'},
)
squirtle.ataque.push(
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🔥', id: 'btn-fuego'},
)
jigglypuff.ataque.push(
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '⚡', id: 'btn-electricidad'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'},
)

pokemones.push(picachu, squirtle, bulbasaur, jigglypuff)

function iniciarJuego() {
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
    let seccionSeleccionarPokemon = document.getElementById('seleccionar-pokemon')
    let seccionSeleccionarAtaques = document.getElementById('seleccionar-ataques')
    let nombrePokemonJugador
    let spanPokemonJugador = document.getElementById('pokemon-jugador')
    let flag = true

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

    extraerAtaques(nombrePokemonJugador)
    seccionSeleccionarAtaques.style.display = 'flex'
    seccionSeleccionarPokemon.style.display = 'none'

    if (flag) {
        seleccionarPokemonEnemigo()
    }
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
            seleccionAtaqueEnemigo()
        })
    })
}

function seleccionarPokemonEnemigo() {
    let pokemonEnemigo = aleatorio(0, pokemones.length - 1)
    let spanPokemonEnemigo = document.getElementById('pokemon-enemigo')
    let nombrePokemonEnemigo = pokemones[pokemonEnemigo].nombre
    spanPokemonEnemigo.innerHTML = nombrePokemonEnemigo[0].toUpperCase() + nombrePokemonEnemigo.slice(1)
    ataquesPokemonEnemigo = pokemones[pokemonEnemigo].ataque
    secuenciaAtaque()
}

function seleccionAtaqueEnemigo() {
    ataqueEnemigoAleatorio = aleatorio(0, ataquesPokemonEnemigo.length - 1)

    if (ataqueEnemigoAleatorio === 0 || ataqueEnemigoAleatorio === 1) {
        ataqueEnemigo.push('AGUA')
    } else if (ataqueEnemigoAleatorio === 2 || ataqueEnemigoAleatorio === 3) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueEnemigoAleatorio === 4) {
        ataqueEnemigo.push('TIERRA')
    } else {
        ataqueEnemigo.push('ELECTRICIDAD')
    }
    console.log(ataqueEnemigo)
    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length === 6) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
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
    } else if (vidasJugador > vidasEnemigo) {
        crearMensajeFinal('Ganaste la batalla!!!')
    }else{
        crearMensajeFinal('Perdiste la batalla!!!')
    }
}

function crearMensaje(resultadoCombate) {
    let sectionMensajes = document.getElementById('seleccionar-ataques')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu  pokemon ataco con ' + indexAtaqueJugador + ', el pokemon de tu enemigo ataco con ' + indexAtaqueEnemigo + ' - ' + resultadoCombate
    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    if (resultadoFinal) {
        let btnSeleccionar = document.getElementById('btn-seleccionar-pokemon')
        let btnReiniciar = document.getElementById('btn-reiniciar')
        let sectionMensajes = document.getElementById('mensajes')
        let parrafo = document.createElement('p')
        parrafo.innerHTML = resultadoFinal
        sectionMensajes.appendChild(parrafo)
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

window.addEventListener('load', iniciarJuego)