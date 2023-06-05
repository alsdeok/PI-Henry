import './App.css';
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";
import { Route, Routes} from "react-router-dom";
import LandingPage from './views/LandingPage';
import Home from './views/Home';
import Detail from './views/Detail';
import Form from './views/Form';
import {charactersToShow} from "./redux/actions";

function App() {
  const characters = useSelector(state=> state?.allPokemons);
  const dispatch = useDispatch()
  const onSearch = async (name)=>{ // busqueda por nombre
    try {
      const {data} = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`)
      dispatch(charactersToShow([data]))
    } catch (error) {
       window.alert(error.response.data.message)
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}></Route>;
        <Route path='/home' element={<Home onSearch={onSearch}></Home>}></Route>
        <Route path='/detail/:id' element={<Detail characters={characters}></Detail>}></Route>
        <Route path='/create' element={<Form></Form>}></Route>
      </Routes>
    </div>
  );
}

export default App;
