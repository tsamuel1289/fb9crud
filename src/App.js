import React from 'react';
import Iniciopractica from './components/Iniciopractica'
import Nuevohome from './components/Nuevohome'
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';


function App() {

  
  return  (<>
    <nav>
        <Link to="/">Home</Link>
        <Link to="practica">Practica</Link>
    </nav>
    <div>Esto esta afuera el Router</div>
    <Router>
      <Routes>
        <Route path="/" element={<Nuevohome/>} />
        <Route path="practica" element={<Iniciopractica/>} />
      </Routes>

    </Router>

  </>);
}

export default App;
