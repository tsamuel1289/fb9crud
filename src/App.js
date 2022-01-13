import React  from 'react';
import './styles/style.scss'
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
//COMPONENTES
import Iniciopractica from './components/Iniciopractica'
import Nuevohome from './components/Nuevohome'
import Navbar from './components/Navbar'
import Contenido from './components/Contenido'

function App() {
  
  return  (<>
    
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Nuevohome/>} /> 
        <Route path="practica" element={<Iniciopractica/>} />
        <Route path="contenido/:id" element={<Contenido/>} />
      </Routes>

    </BrowserRouter>

  </>);
}

export default App;
