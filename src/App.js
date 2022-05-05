import './App.css';
import { BrowserRouter,Route, Routes} from 'react-router-dom';
import Login from './Components/login/Login';
import Listado from './Components/HomePage/Listado';
import ResponsiveAppBar from './Components/Navigation/ResponsiveAppBar';
import LabelBottomNavigation from './Components/Navigation/BottomNavigation';
import Pelicula from './Components/Peliculas/Pelicula';
import Resultados from './Components/Resultados';
import FavContextProvider from './Components/Context/FavContext';
import Favoritos from './Components/Favoritos/Favoritos';



function App() {
  return (
    <>
  <FavContextProvider>
    <BrowserRouter>
    <ResponsiveAppBar/>
      <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/listado' element={<Listado/>}/>
      <Route exact path='/pelicula/:movieId' element={<Pelicula/>}/>
      <Route exact path='/resultado/:search' element={<Resultados/>}/>
      <Route exact path='/favoritos' element={<Favoritos/>}/>
      </Routes>
      <LabelBottomNavigation/>
    </BrowserRouter>
  </FavContextProvider>
    </>
  );
}

export default App;
