import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';
import Home from './pages/Home';
import MeuPerfil from './pages/MeuPerfil';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Cadastro" element={<Cadastro onRegistrationSuccess={(userData) => {}} />} />
          <Route path="/" element={<Login onLoginSuccess={(userData) => {}} />} />
          <Route path="/Home" element={<Home isModalOpen={isModalOpen} onToggleModal={() => setIsModalOpen(!isModalOpen)} />}/>
          <Route path="/Profile" element={<MeuPerfil />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
