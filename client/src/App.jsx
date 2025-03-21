import { Routes, Route } from 'react-router';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import GamesCatalog from './components/games-catalog/GamesCatalog';
import GameDetails from './components/game-details/GameDetails';
import GameCreate from './components/game-create/GameCreate';
import GameEdit from './components/game-edit/GameEdit';

function App() {
  const [authData, setAuthData] = useState('');

  function userLoginHandler(resultData) {
    setAuthData(resultData);
  }

  return (
    <UserContext.Provider value={{ ...authData, userLoginHandler }}>

      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="games" element={<GamesCatalog />} />
            <Route path="games/create" element={<GameCreate />} />
            <Route path="games/:gameId/details" element={<GameDetails />} />
            <Route path="games/:gameId/edit" element={<GameEdit />} />
          </Routes>
        </main>
      </div>

    </UserContext.Provider>
  );
}

export default App;
