import { Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import GamesCatalog from './components/games-catalog/GamesCatalog';
import GameDetails from './components/game-details/GameDetails';
import GameCreate from './components/game-create/GameCreate';

function App() {


  return (
    <div id="box">
      <Header />


      <main id="main-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="games" element={<GamesCatalog />} />
          <Route path="games/create" element={<GameCreate />} />
          <Route path="games/:id" element={<GameDetails />} />
        </Routes>
      </main>


    </div>
  );
}

export default App;
