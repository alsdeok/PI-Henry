import {useNavigate} from "react-router-dom"
import { useState } from "react";
import { useSelector } from "react-redux";
import validator from "../Helpers/Validaciones"
import axios, { AxiosError } from "axios";

export default function Form(props) {
    const types = useSelector(state=>state.allTypes);
    const [pokeCreated, setPokeCreated] = useState(false)
    const [error,setError] = useState({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
    });
    const [state,setState] = useState({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],     
  
    })
    

    const [type,setType] = useState("poison") 
    const navigate = useNavigate();
    const redirect = () =>{
        navigate("/home")
    }
    const handleChange = (key, e) =>{
        setState((state)=>({
            ...state,
           [key]: e?.target.value
        }));
        
    }
    const handleError = (key, e) => {
        const errores = validator({ [key]: e?.target.value });
        setError(errores ? { ...error, [key]: errores[key] } : {});
      };
    const filterTypes = (event) => {
                setType(event.target.value)
                if(types?.[event.target.value]){
                    const aux = types.filter(e => e !== event.target.value)
                    setState((stateprev)=> ({
                        ...stateprev,
                        types: aux
                    }))
                }else{
                setState((stateprev)=> ({
                        ...stateprev,
                        types: [...stateprev.types,event.target.value]
                    }))
                }}

    const deleteFilterTypes = (t) =>{
        const filteredTypess = state.types.filter(e => e !== t)
        setState((prevState) => ({ ...prevState, types: filteredTypess }))
    }
    const post = async (e) => {
        try {
          setPokeCreated(false);
          e.preventDefault();
          const response = await axios.post("http://localhost:3001/pokemons", state);
          
          if (response.status === 200) {
            setState({
              name: "",
              image: "",
              hp: 0,
              attack: 0,
              defense: 0,
              speed: 0,
              height: 0,
              weight: 0,
              types: [],
            });
            setPokeCreated(true);
          } else {
            console.log("Error al crear el Pokémon");
          }
        } catch (errore) {
            if(errore.response.data.error == "El Pokemon ya existe en la DB"){
                setError({ ...error, name : "El Pokemon ya existe en la DB" });   
            }

        }
      };

    const r = Object.values(error).filter(e => e != undefined)
    console.log(r)
    return (
        <div>
            <button onClick={redirect}>X</button>
            <h1>Crear Pokemon</h1>
            <img src={state.image} alt={state.name} />
            <form onSubmit={post}>
                {
                    Object.entries(state).map(([key,value]) =>{ 
                        if(key === "types"){
                            return <div key={key}>
                                        <label>{key.toUpperCase()}</label><select value={type} onChange={filterTypes}>
                                            {
                                                types.map(
                                                    t => <option key={t} value={t} disabled={state.types.length > 1}>{t}</option>
                                            )}
                                        </select><label>Maximo dos tipos</label>
                                        {
                                          state.types.map(t => {
                                            return <div key={t}>
                                                    <button onClick={()=>deleteFilterTypes(t)}>X</button><span>{t}</span>
                                                    </div>})
                                        }
                                        
                                    </div>
                        }else{
                       return <div key={key}>
                            <label>{key.toUpperCase()}</label><input type="text" value={value} onChange={(e) => {handleChange(key,e);handleError(key,e)}} onBlur={(e) => handleError(key,e)} />
                            {
                             error[key]?<span>{error[key]}</span>:null
                            }
                        </div>}
                    })          
                }
                <button type="submit" disabled={r.length !== 0}>Crear Pokemon</button>{pokeCreated?<span>Pokemon creado!</span>: null}
            </form>
        </div>
    )
}