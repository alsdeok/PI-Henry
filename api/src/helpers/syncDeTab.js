const {Typepoke} = require('../db');

const syncTypes =  (pokemon, types) => {
  
  types?.map(async(type) => {
        const typepoke = await Typepoke.findOne({ where: { name: type } });
        if (typepoke) {
          await pokemon.addTypepoke(typepoke);
        }
    })

  };
  
  module.exports = {
    syncTypes,
  };