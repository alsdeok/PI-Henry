const axios = require("axios");
const {Pokemon} = require("../db");
const {getStatsAndTypes} = require("../helpers/StatsTypeApi")
const {getPokeWhitTypesDb} = require("../helpers/getPokeWhitTypesDb");

const storeBack = [];



const loadServer = async (req, res) => {
       const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000"
    try {
      if(storeBack.length === 0){
        const response = await axios.get(url);
        const pokemonsApi = response.data.results.map(async (poke) => { // guardo las promesas
          const {data} = await axios.get(poke.url); // traigo los datos de cada uno
          const pokemon = getStatsAndTypes(data)
          return pokemon;
        });
      
        const result = await Promise.all(pokemonsApi); // el promise.alll espera a que se resuelvan las promesas
        const pokeDB = await getPokeWhitTypesDb()
        storeBack.push(result.concat(pokeDB));
        return res.status(200).json(storeBack[0]);}
        else{
          getPokeWhitTypesDb().then((data) => {
            const pokeCreated = storeBack[0].filter(e => e?.pokemon.name === data[data.length - 1]?.pokemon.name )
            console.log(pokeCreated)
            if(pokeCreated.length === 0){
              console.log("hola")
            storeBack[0].push(data[data.length - 1]);}
        })
          
          return res.status(200).json(storeBack[0]);
      }
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };


module.exports = {loadServer, storeBack};
