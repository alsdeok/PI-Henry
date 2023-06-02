import {useNavigate} from "react-router-dom"
import { useState } from "react";
import { useSelector } from "react-redux";
import validator from "../Helpers/Validaciones"
import axios, { AxiosError } from "axios";
import style from "../modulos/Form.module.css"

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
    

    const [type,setType] = useState("unknown") 
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
        <div className={style.divPadre}>
            <button  className={style.buttonVolver} onClick={redirect}>«</button>
            <h1>Crear Pokemon</h1>
            <div className={style.form}>
                <div className={style.divImage}>
                    <img className={style.img} src={state.image ? state.image : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png"} alt={state.name} />
                    <div className={style.tiposCreados}>
                        {
                            state.types.map(t => {
                            return <div key={t} >
                                    <button onClick={()=>deleteFilterTypes(t)} className={style.botonEliminar}>X</button><span>  {t}</span>
                                    </div>})
                        }
                    </div>
                </div>
                <form onSubmit={post} >
                    {
                        Object.entries(state).map(([key,value]) =>{ 
                            if(key === "types"){
                                return <div key={key}>
                                            <label>{key.toUpperCase()}</label>
                                            <select value={type} onChange={filterTypes}>
                                                {
                                                    types.map(
                                                        t => <option key={t} value={t} disabled={state.types.length > 1}>{t}</option>
                                                )}
                                            </select><label>Maximo dos tipos</label>
                                            <br />
                                            {
                                                state.types.length === 0 ? <span className={style.error}>*Tiene que ser al menos de un tipo</span> : null
                                            }
                                        </div>
                            }else{
                            return <div key={key}>
                                <label>{key.toUpperCase()}</label><input type="text" value={value} onChange={(e) => {handleChange(key,e);handleError(key,e)}} onBlur={(e) => handleError(key,e)} />
                                <br/>
                                {
                                error[key]?<span className={style.error}>*{error[key]}</span>:null
                                }
                            </div>}
                        })          
                    }
                    <button className={style.buttonCrear} type="submit" disabled={r.length > 0 || (state.types.length === 0)}>Crear Pokemon</button>{pokeCreated?<span>Pokemon creado!</span>: null}
                </form>
            </div>
            
        </div>
    )
}