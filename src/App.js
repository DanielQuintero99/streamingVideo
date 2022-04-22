import './App.css';
import { BrowserRouter,Route, Routes} from 'react-router-dom';
import Login from './Components/login/Login';
import Listado from './Components/HomePage/Listado';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/listado' element={<Listado/>}/>
      </Routes>
    </BrowserRouter>
  
  
  );
}

export default App;
