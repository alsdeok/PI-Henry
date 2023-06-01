const { Router } = require('express');
const getAllPokemons = require("../Controllers/getAllPokemon")
const getPokemon = require("../Controllers/getPokemon")
const getPokemonName = require("../Controllers/getPokemonName");
const getTypes = require("../Controllers/getTypes");
const {loadServer} = require('../Controllers/loadServer');


const router = Router();

router.get("/",  loadServer);

router.get("/pokemons", (req,res)=>{
    const query = req.query
    if(query.type){
        const typeArray = query.type.split(",");
        query.type = typeArray;
    }
    getAllPokemons(query,res)
});

router.get("/pokemons/name", (req, res)=>{
    const { name } = req.query;

    getPokemonName(name,req,res);
    
});

router.get("/pokemons/:id", (req,res)=>{
    const {id} = req.params;
    const idNumer = Number(id)
    getPokemon(idNumer,req,res);
    
});

router.get("/types", (req,res)=>{
    getTypes(req,res)
})


module.exports = router;
