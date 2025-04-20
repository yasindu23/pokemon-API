const express = require('express')
const pokemonRouter = express.Router()

const {
    getPokemon,
    getRandomPokemon,
    getSinglePokemon,
    searchPokemon
} = require('../controller/pokemon')

pokemonRouter.get('/', getPokemon)
pokemonRouter.get('/random', getRandomPokemon)
pokemonRouter.get('/search', searchPokemon)
pokemonRouter.get('/:id', getSinglePokemon)

module.exports = pokemonRouter