require('dotenv').config()
const connectDb = require('./db/connect')
const Pokemon = require('./model/pokemon')

const testing = async () => {
    await connectDb(process.env.MONGO_URL)
    console.log('database connected')

    for (let index = 1027; index <= 1302; index++) {
        const promises = [];

        const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
        promises.push(await fetch(url).then((res) => res.json()));

        const pokemon = promises.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
        }));

        console.log(pokemon[0])
        await Pokemon.create(pokemon[0])
    }
}

testing()