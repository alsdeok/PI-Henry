const {Pokemon} = require("../db");
const {syncTypes} = require("../helpers/syncDeTab")

const createPoke = async (pokemon,req,res) =>{
   try {
    const pokeCreated = await Pokemon.create(pokemon);
    const {types} = pokemon; 
    syncTypes(pokeCreated, types)// helper para syncronizar la tabla intermedia
    return res.status(200).json(pokemon)
   } catch (error) {
    if(error.message == "llave duplicada viola restricción de unicidad «pokemons_name_key»"){
        return res.status(400).json({error: "El Pokemon ya existe en la DB"})
    }
    console.log( error.message)
       return res.status(400).json({error: error.message})
   }
}

module.exports = createPoke
