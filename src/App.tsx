import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
const App = () => {
  return (
    <Routes>
      <PrivateRoute path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
