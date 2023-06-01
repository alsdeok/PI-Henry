const {Pokemon, Typepoke} = require("../db");
const { Op } = require("sequelize");

const getPokeWhitTypesDb = async(param)=>{
    if(typeof param === "number"){
        const pokeDb = await Pokemon.findByPk(param,{
            include: [Typepoke],
        });
        const { typepokes, ...pokemonData } = pokeDb.dataValues; // destructuro para separar typepokes de lo demas
        return {pokemon:{...pokemonData,types : typepokes.map(e => e.name)}}

    }else if(typeof param === "string"){
        const pokeDb = await Pokemon.findAll({
            where:{
                name: {
                    [Op.iLike]: param
                }
            },
            include: [Typepoke],
        });
        const { typepokes, ...pokemonData } = pokeDb[0].dataValues; // destructuro para separar typepokes de lo demas
        return{pokemon:{...pokemonData,type: typepokes.map(e => e.name)}}
    
    }else{
        const pokesDb = await Pokemon.findAll({
            include: [Typepoke],
        });
        const poke = pokesDb.map(e => {
            const { typepokes, ...pokemonData } = e.dataValues; // destructuro para separar typepokes de lo demas
            return e = {pokemon:{...pokemonData,types : e.typepokes.map(e => e.name)}}
        } )
    
     return poke
    }

}

module.exports = {getPokeWhitTypesDb}