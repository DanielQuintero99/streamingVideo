import './App.css';
import { BrowserRouter,Route, Routes} from 'react-router-dom';
import Login from './Components/login/Login';
import Listado from './Components/HomePage/Listado';
import ResponsiveAppBar from './Components/Navigation/ResponsiveAppBar';
import LabelBottomNavigation from './Components/Navigation/BottomNavigation';



function App() {
  return (
    <>
    <ResponsiveAppBar/>
    <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/listado' element={<Listado/>}/>
      </Routes>
    </BrowserRouter>
    <LabelBottomNavigation/>
    </>
  );
}

export default App;
