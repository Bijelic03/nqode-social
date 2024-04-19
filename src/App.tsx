import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/profile/:username' element={<ProfilePage />} />
      <Route path='/' element={<PrivateRoute />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
