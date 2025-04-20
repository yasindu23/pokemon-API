const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Pokemons', Schema)