const {pag } = require("./pag");

const order = (query,res,pokemones) =>{
    if(query.order === "Asc"){
        const pokesOrdenados = pokemones.sort((a,b) =>  a.pokemon?.name.localeCompare(b.pokemon?.name))
        let resultFinal =  pag(query,pokesOrdenados) // paginado
        
        res.status(200).json(resultFinal);
      }else{
        const pokesOrdenados = pokemones.sort((a,b) =>  b.pokemon?.name.localeCompare(a.pokemon?.name))
        let resultFinal =  pag(query,pokesOrdenados) // paginado
         res.status(200).json(resultFinal);
      }
} 
module.exports = {
  order
}