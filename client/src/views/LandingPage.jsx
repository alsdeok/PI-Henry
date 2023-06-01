import { useNavigate } from "react-router-dom"
import style from "../modulos/LandingPage.module.css"
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux";
import { charactersToShow, allTypes} from "../redux/actions";
import axios from "axios";

export default function(props){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const redirect = () =>{
        navigate("/home")
    } 
    useEffect(()=>{
        const apiCharacters = async()=>{
            const {data} = await axios.get("http://localhost:3001/")
            dispatch(charactersToShow(data))
            const res = await axios("http://localhost:3001/types")
            dispatch(allTypes(res.data))
            console.log("Server Loaded")
            if(data){
               return( <div>

                </div>)
            }
        }
        apiCharacters()
        
    },[])
    return(
        <div>
            <h1>Disfruta de la magia de los Pokemones!!</h1>
            <button className={style.boton} onClick={redirect}>Empezar</button>
        </div>
    )
}