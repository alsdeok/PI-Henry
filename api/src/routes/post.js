const { Router } = require('express');
const createPoke = require("../Controllers/createPoke")

const router = Router();

router.post("/pokemons", (req,res) =>{
    const pokemon = req.body;
    console.log(req.body)
    createPoke(pokemon,req,res)
})

module.exports = router;