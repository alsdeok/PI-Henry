const axios = require("axios");
const {Typepoke} = require("../db");

const getTypes = async(req,res) =>{
    try {
        const {data} = await axios("https://pokeapi.co/api/v2/type")
        const types = [];
        data.results.forEach(type => {
            types.push(type.name)
            Typepoke.findOrCreate({
                where: {
                    name: type.name
                }
            })
        });
        res.status(200).json(types)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = getTypes;