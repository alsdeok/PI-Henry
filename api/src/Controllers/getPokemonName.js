const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemon} = require("../db");
const { getStatsAndTypes } = require("../helpers/StatsTypeApi");
const {getPokeWhitTypesDb} = require("../helpers/getPokeWhitTypesDb");

const getPokemonName = async (name, req, res) => {
  const searchName = name.toLowerCase();
  try {
    const dbPokemons = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: searchName,
        },
      },
    });
    if (dbPokemons.length !== 0) {
      const pokemonComplete = await getPokeWhitTypesDb(searchName)
      return res.status(200).json(pokemonComplete);
    }
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${searchName}`
    );
    
      const poke = getStatsAndTypes(data);
      return res.status(200).json(poke);

  } catch (error) {
    return res.status(500).json({ message: "No se encontro el Pockemon" });
  }
};

module.exports = getPokemonName;
