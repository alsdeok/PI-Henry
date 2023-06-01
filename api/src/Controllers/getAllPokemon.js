const { storeBack } = require("./loadServer");
const {order } = require("../helpers/order");
const getAllPokemon = (query, res) => {
    const { type,dataBs } = query;
    let pokemones;
    if(!type){
       pokemones = storeBack[0]
      }   
     else{
      pokemones = storeBack[0].filter(e =>
      type.every(t => e?.pokemon.types.includes(t))
      )}   
    if(dataBs === "true"){
        pokemones = pokemones?.filter(e => e?.pokemon.dataBs);
        return order(query,res,pokemones)   
      }else if(dataBs === "false"){
        pokemones = pokemones?.filter(e => !e?.pokemon.dataBs);      
        return order(query,res,pokemones)   
      }

      order(query,res,pokemones) 
  };


module.exports = getAllPokemon;