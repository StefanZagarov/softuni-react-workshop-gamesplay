import { Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import GamesCatalog from './components/games-catalog/GamesCatalog';
import GameDetails from './components/game-details/GameDetails';
import GameCreate from './components/game-create/GameCreate';
import GameEdit from './components/game-edit/GameEdit';
import { useState } from 'react';

function App() {
  const [authData, setAuthData] = useState('');

  function userLoginHandler(resultData) {
    console.log(resultData);
    setAuthData(resultData);
  }

  return (
    <div id="box">
      <Header />


      <main id="main-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login onLogin={userLoginHandler} />} />
          <Route path="register" element={<Register />} />
          <Route path="games" element={<GamesCatalog />} />
          <Route path="games/create" element={<GameCreate />} />
          <Route path="games/:gameId/details" element={<GameDetails email={authData.email} />} />
          <Route path="games/:gameId/edit" element={<GameEdit />} />
        </Routes>
      </main>


    </div>
  );
}

export default App;
