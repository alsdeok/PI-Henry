import SearchBar from "../componentes/SearchBar";
import Cards from "../componentes/Cards";
import {useSelector,useDispatch} from "react-redux";
import { setPageCant,pageState,charactersToShow} from "../redux/actions"
import { useEffect} from "react";
import axios from "axios";


export default function Home(props){
    const {onSearch} = props
    const page = useSelector(state=>state.pageState);
    const filters = useSelector(state=>state.filters);
    const filterDb = useSelector(state=>state.filterDb);
    const order = useSelector(state=>state.order);
    const characters = useSelector(state=> state?.allPokemons);
    const pageCant = useSelector(state=>state.pageCant);
    useEffect(()=>{
  
        axios.get("http://localhost:3001/").then(()=>{console.log("dbLoaded"); 
            const tipos = filters.length === 0 ? "" : filters.join(",");
            axios.get(`http://localhost:3001/pokemons?type=${tipos}&dataBs=${filterDb}&order=${order}&page=${page}`)
            .then(({data})=>{dispatch(charactersToShow(data[0]));dispatch(setPageCant(data[1]))})
         })
       
    },[])

    const dispatch = useDispatch()
    let numPage = page;
    const previous = () =>{
        const numero = numPage - 1
        dispatch(pageState(numero))
    } 
    const next = () =>{
        const numero = numPage + 1 
        dispatch(pageState(numero))
    }
    const firstPage = () =>{
        dispatch(pageState(1))
    }
    const lastPage = () =>{
        dispatch(pageState(pageCant))
    }
    console.log(pageCant)
    return(<div>
        <SearchBar onSearch={onSearch} ></SearchBar>
        <button onClick={firstPage} disabled={page===1}>{"<<"}</button>
        <button onClick={previous} disabled={page===1}>prev</button>
        <span>page: {page}</span>
        <button onClick={next} disabled={page >= pageCant}>next</button>
        <button onClick={lastPage} disabled={page >= pageCant}>{">>"}</button>
        <Cards  characters={characters} onSearch={onSearch}></Cards>
    </div>)
}