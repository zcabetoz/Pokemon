let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    // let sectionReiniciar = document.getElementById('reiniciar')
    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataques')
    seccionSeleccionarAtaque.style.display = 'none'
    let btnPokemonJugador = document.getElementById('btn-seleccionar-pokemon')
    btnPokemonJugador.addEventListener('click', seleccionarPokemonJugador)
    let btnAgua = document.getElementById('btn-agua')
    btnAgua.addEventListener('click', ataqueAgua)
    let btnFuego = document.getElementById('btn-fuego')
    btnFuego.addEventListener('click', ataqueFuego)
    let btnTierra = document.getElementById('btn-tierra')
    btnTierra.addEventListener('click', ataqueTierra)
    let btnReiniciar = document.getElementById('btn-reiniciar')
    btnReiniciar.addEventListener('click', reiniciarJuego)
    btnReiniciar.style.display = 'none'
}

function seleccionAtaqueEnemigo() {
    ataqueEnemigo = aleatorio(1, 3)
    if (ataqueEnemigo === 1) {
        ataqueEnemigo = 'AGUA'
    } else if (ataqueEnemigo === 2) {
        ataqueEnemigo = 'FUEGO'
    } else {
        ataqueEnemigo = 'TIERRA'
    }
    combate()
}
function seleccionarPokemonJugador() {
    let seccionSeleccionarAtaques = document.getElementById('seleccionar-ataques')
    let seccionSeleccionarPokemon = document.getElementById('seleccionar-pokemon')

    const $ = selector => document.getElementById(selector)
    let inputPikachu = $('pikachu')
    let inputCharmander = $('jigglypuff')
    let inputSquirtle = document.getElementById('squirtle')
    let inputBulbasaur = document.getElementById('bulbasaur')
    let spanPokemonJugador = document.getElementById('pokemon-jugador')
    let flag = true
    if (inputPikachu.checked) {
        spanPokemonJugador.innerHTML = 'Pikachu'
    } else if (inputCharmander.checked) {
        spanPokemonJugador.innerHTML = 'Jigglypuff'
    } else if (inputSquirtle.checked) {
        spanPokemonJugador.innerHTML = 'Squirtle'
    } else if (inputBulbasaur.checked) {
        spanPokemonJugador.innerHTML = 'Bulbasaur'
    } else {
        flag = false
        alert('no has seleccionado tu pokemon')
    }
    if (flag) {
        seleccionarPokemonEnemigo()
    }
    seccionSeleccionarAtaques.style.display = 'block'
    seccionSeleccionarPokemon.style.display = 'none'
}

function seleccionarPokemonEnemigo() {
    let pokemonEnemigo = aleatorio(1, 4)
    let spanPokemonEnemigo = document.getElementById('pokemon-enemigo')
    if (pokemonEnemigo === 1) {
        spanPokemonEnemigo.innerHTML = 'Pikachu'
    } else if (pokemonEnemigo === 2) {
        spanPokemonEnemigo.innerHTML = 'Jigglypuff'
    } else if (pokemonEnemigo === 3) {
        spanPokemonEnemigo.innerHTML = 'Squirtle'
    } else
        spanPokemonEnemigo.innerHTML = 'Bilbasaur'
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    seleccionAtaqueEnemigo()
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    seleccionAtaqueEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    seleccionAtaqueEnemigo()
}

function combate() {
    let resultadoCombate
    let spanVidasJugador = document.getElementById('vidas-pokemon-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-pokemon-enemigo')

    if (ataqueJugador === ataqueEnemigo) {
        resultadoCombate = 'EMPATE'
    } else if ((ataqueJugador === 'FUEGO' && ataqueEnemigo === 'TIERRA') || (ataqueJugador === 'AGUA' && ataqueEnemigo === 'FUEGO') || (ataqueJugador === 'TIERRA' && ataqueEnemigo === 'AGUA')) {
        resultadoCombate = 'GANASTE'
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo.toString()
    } else {
        resultadoCombate = 'PERDISTE'
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador.toString()
    }
    crearMensaje(resultadoCombate)
    revisarVidas()
}

function revisarVidas() {
    let btnFuego = document.getElementById('btn-fuego')
    if (vidasJugador === 0) {
        crearMensajeFinal('Perdiste la batallla')
    } else if (vidasEnemigo === 0) {
        crearMensajeFinal('Ganaste la batalla!!!')
    }
}

function crearMensaje(resultadoCombate) {
    let sectionMensajes = document.getElementById('seleccionar-ataques')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu  pokemon ataco con ' + ataqueJugador + ', el pokemon de tu enemigo ataco con ' + ataqueEnemigo + ' - ' + resultadoCombate
    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    if (resultadoFinal) {
        let btnSeleccionar = document.getElementById('btn-seleccionar-pokemon')
        let btnReiniciar = document.getElementById('btn-reiniciar')
        let btnFuego = document.getElementById('btn-fuego')
        let btnAgua = document.getElementById('btn-agua')
        let btnTierra = document.getElementById('btn-tierra')
        let sectionMensajes = document.getElementById('mensajes')
        let parrafo = document.createElement('p')
        parrafo.innerHTML = resultadoFinal
        sectionMensajes.appendChild(parrafo)
        btnFuego.disabled = true
        btnAgua.disabled = true
        btnTierra.disabled = true
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