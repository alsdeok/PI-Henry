import {  useState, useEffect } from "react";
import style from "../modulos/SearchBar.module.css";
import {useSelector,useDispatch} from "react-redux";
import {charactersToShow, pageState,filterDB,filterTypes,filterorder,setPageCant} from "../redux/actions";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function SearchBar(props){
    const {onSearch} = props;
    const filters = useSelector(state=>state.filters)
    const types = useSelector(state => state.allTypes)
    const filterDb = useSelector(state=>state.filterDb);
    const order = useSelector(state=>state.order);
    const page = useSelector(state=>state.pageState);
    const [name,setName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tipos = filters.length === 0 ? "" : filters.join(",");
    useEffect(() =>{
        axios.get(`http://localhost:3001/pokemons?type=${tipos}&dataBs=${filterDb}&order=${order}&page=${page}`)
        .then(({data})=>{dispatch(charactersToShow(data[0]));dispatch(setPageCant(data[1]))})
    }, [page])

    const handleChange = (event) =>{
        setName(event.target.value);
    };
    const onKeyDown = (event) =>{
        if(event.keyCode === 13){
            onSearch(name)
        }
    }
    const checkbox =(event) =>{   
        if(event.target.checked){
            dispatch(filterTypes([...filters,event.target.id]))
        }else{
            const aux = filters.filter(e => e !== event.target.id )
            dispatch(filterTypes(aux))
        }
    }
    const select = (event)=>{
        dispatch(filterDB(event.target.value))
    }
    const filtrar = (tipo,dataBs,order)=>{
        let tipos;
        if(tipo.length === 0){
            tipos = "";
          
        }else{
            tipos = tipo.join(",") ;
        }
        axios.get(`http://localhost:3001/pokemons?type=${tipos}&dataBs=${dataBs}&order=${order}&page=1`).then(
            ({data})=>{dispatch(charactersToShow(data[0]));dispatch(pageState(1));dispatch(setPageCant(data[1]))}
        )
    }
    let valor;
    const orderPokes = (event) =>{
        valor = event.target.value
        dispatch(filterorder(valor))
    }
    const handleClick = (evento)=>{
        evento.preventDefault();
    }
    const redirect = () =>{
        navigate("/create")
    }
    return(
        <div>
            <button onClick={redirect}> Crear Pokemon</button>
            <form onSubmit={handleClick}>
            <div>
                {
                    types ?  types?.map(e => {
                        return(
                        <label key={e}>
                        <input type="checkbox" disabled={filters.length > 1 && !filters.includes(e) } id={e} onChange={checkbox}  checked={filters.includes(e)}  />
                        {e}
                      </label>)
                    })
                        :null
                }
                <br/>
                <span>Por: </span>
                <select name="Filter" value={filterDb} onChange={select} >
                    <option value="All">All</option>
                    <option value="false">Api</option>
                    <option value="true">DataBase</option>
                </select>
                <select name="Order" value={order} onChange={orderPokes} >
                    <option value="Asc">Ascendente</option>
                    <option value="Des">Descendente</option>
                </select>
                
            </div>
            <button onClick={()=>filtrar(filters,filterDb,order)} type="submit">Filtrar</button>
            <input value={name} onChange={handleChange} onKeyDown={onKeyDown}></input>
            </form>
        </div>
    )
}