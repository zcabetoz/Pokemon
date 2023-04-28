const express = require("express")
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarPokemon(pokemon){
        this.pokemon = pokemon
    }
}

class Pokemon{
    constructor(nombre) {
        this.nombre = nombre
    }

}

app.get("/unirse", (req, res) => {

    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/pokemon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.pokemon || ""
    const pokemon = new Pokemon(nombre)

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
})