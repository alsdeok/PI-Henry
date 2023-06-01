import { useNavigate } from "react-router-dom";

export default function Card(props){
    const {id, image, name, types} = props
    const navigate = useNavigate()
    const tipos = types?.join(" - ")

    const showDetail = (id) =>{
       navigate(`/detail/${id}`)
    } 
    
    return(
        <div>
            <div onClick={()=>{showDetail(id)}}>
                <img src={image} alt={name}/>
            </div>
            <h3>Nombre: {name}</h3>
            <h3>Tipo: {tipos}</h3>
            <hr />
        </div>
    )
}