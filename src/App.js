import React  from 'react';
import './styles/style.scss'
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
//COMPONENTES
import Iniciopractica from './components/Iniciopractica'
import Nuevohome from './components/Nuevohome'
import Navbar from './components/Navbar'
import Contenido from './components/Contenido'
import click1 from './styles/click1.mp3'

function App() {
  let bpm = (60 /120) *1000
  Audio(click1)
  //setInterval(()=> beat.play() , 1000 )

  return  (<>
    
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Nuevohome/>} /> 
        <Route path="practica" element={<Iniciopractica/>} />
        <Route path="contenido" element={<Contenido/>} />
      </Routes>

    </BrowserRouter>

  </>);
}

export default App;
