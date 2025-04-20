const Pokemon = require("../model/pokemon");

const getPokemon = async (req, res, next) => {
  try {
    const pokemonTask = Pokemon.find({
      type: {
        $regex: req.query.type,
        $options: "i",
      }
    })
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const data = await pokemonTask
      .skip((page - 1) * limit).limit(limit).select('-_id -__v')

    res.status(200).json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

const searchPokemon = async (req, res, next) => {
  try {
    const data = await Pokemon.find({
      name: {
        $regex: req.query.name, $options: "i",
      }
    }).select('-_id -__v')

    res.status(200).json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

const getRandomPokemon = async (req, res, next) => {
  try {
    const randomIndex = Math.floor(Math.random() * 1025)
    const data = await Pokemon
      .find({ id: randomIndex }).select('-_id -__v')

    res.status(200).json({ success: true, data })
  } catch (error) {
    next(error)
  }
};

const getSinglePokemon = async (req, res, next) => {
  try {
    const data = await Pokemon.
      find({ id: Number(req.params.id) }).select('-_id -__v')

    if (data.length === 0) {
      return res.status(404).json({ success: false, msg: `No pokemon with id ${req.params.id}` })
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getPokemon,
  getSinglePokemon,
  getRandomPokemon,
  searchPokemon
};
