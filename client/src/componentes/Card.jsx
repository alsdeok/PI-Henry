import style from "../modulos/Card.module.css"
import { useNavigate } from "react-router-dom";

export default function Card(props){
    const {id, image, name, types} = props
    const navigate = useNavigate()
    const tipos = types?.join(" - ")

    const showDetail = (id) =>{
       navigate(`/detail/${id}`)
    } 
    
    return(
        <div className={style.divPadre}>
            <h4> {name}</h4>
            <div onClick={()=>{showDetail(id)}} className={style.divImage}>
                <img src={image} alt={name}/>
            </div>
            <p>----------------------</p>
            <h3>Tipo:</h3>
            <h4>{tipos}</h4>

        </div>
    )
}