const {pag } = require("./pag");

const order = (query,res,pokemones) =>{
  let pokesOrdenados = pokemones;
    if(query.order === "Asc"){
        if(query.attack === "Name"){
          pokesOrdenados = pokemones.sort((a,b) =>  a.pokemon?.name.localeCompare(b.pokemon?.name))
          console.log("esto es pokesOrde", pokesOrdenados)
          let resultFinal =  pag(query,pokesOrdenados);
          return res.status(200).json(resultFinal);
        }else{
          const pokesOrdenadosAtt = pokesOrdenados.sort((a,b) => b.pokemon?.attack - a.pokemon?.attack );
          let resultFinal =  pag(query,pokesOrdenadosAtt); // paginado
          return res.status(200).json(resultFinal);
        }
      }else{
        if(query.attack === "Name"){
        pokesOrdenados = pokemones.sort((a,b) =>  b.pokemon?.name.localeCompare(a.pokemon?.name))
        let resultFinal =  pag(query,pokesOrdenados);
        return res.status(200).json(resultFinal);
        }else{
        const pokesOrdenadosAtt = pokesOrdenados?.sort((a,b) => a.pokemon?.attack - b.pokemon?.attack );
        let resultFinal =  pag(query,pokesOrdenadosAtt); // paginado
        return res.status(200).json(resultFinal);
        }
      
       
    }
}
module.exports = {
  order
}