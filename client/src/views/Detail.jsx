import axios from "axios";
import style from "../modulos/Detail.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default  function Detail(props){
    const {id} = useParams();
    const [pokemon, setPokemon] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
     axios(`http://localhost:3001/pokemons/${id}`)
     .then(({data}) =>{
        if(data){
            setPokemon(data.pokemon)
        }
     })

    },[])

    const redirect = () =>{
      navigate("/home")
    }
     
    return(
      <div className={style.divPadre}>
        <div className={style.divHijo}>
        <button onClick={redirect} className={style.buttonVolver}>«</button>
        <img src={pokemon.image} alt={pokemon.name} className={style.img} />
        <div className={style.divH1}>
          <h1>
          Nombre: {pokemon.name} <br/>
          ID: {pokemon.id}<br/>
          Hp: {pokemon.hp}<br/>
          Attack: {pokemon.attack}<br/>
          Defense: {pokemon.defense}<br/>
          Speed: {pokemon.speed}<br/>
          Height: {pokemon.height}<br/>
          Weight: {pokemon.weight}<br/>
          Type: {pokemon.types}<br/>
          </h1>
        </div>
        </div>
      </div>
    )
    




}