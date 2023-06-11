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
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}></Route>;
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/detail/:id' element={<Detail characters={characters}></Detail>}></Route>
        <Route path='/create' element={<Form></Form>}></Route>
      </Routes>
    </div>
  );
}

export default App;
