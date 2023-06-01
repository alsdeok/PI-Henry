const axios = require("axios");
const { Pokemon, Typepoke } = require("../db");
const { getStatsAndTypes } = require("../helpers/StatsTypeApi");
const {getPokeWhitTypesDb} = require("../helpers/getPokeWhitTypesDb")

const getPokemon = async (id, req, res) => {
  const pokeDB = await Pokemon.findByPk(id);
  if (pokeDB) {
    const pokemonComplete = await getPokeWhitTypesDb(id)
    return res.status(200).json(pokemonComplete);
  }
  try {
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (data) {
      const poke = getStatsAndTypes(data); //helper
      return res.status(200).json(poke);
    }
    throw new Error("Pokemon no encontrado");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getPokemon;
