import { Routes, Route } from 'react-router';
import UserProvider from './providers/UserProvider';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import GamesCatalog from './components/games-catalog/GamesCatalog';
import GameDetails from './components/game-details/GameDetails';
import GameCreate from './components/game-create/GameCreate';
import GameEdit from './components/game-edit/GameEdit';
import Logout from './components/logout/Logout';
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';

function App() {


  return (
    <UserProvider >
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="games" element={<GamesCatalog />} />
            <Route element={<AuthGuard />}>
              <Route path="games/create" element={<GameCreate />} />
              <Route path="games/:gameId/edit" element={<GameEdit />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route element={<GuestGuard />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="games/:gameId/details" element={<GameDetails />} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
