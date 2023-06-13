import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Navbar from './components/navbar/Navbar'
import Logout from './components/logout/Logout';
import Dashboard from './components/dashboard/Dashboard';
import UserDb from './components/dashboard/UserDb';
import Emp from './components/emp/Emp';

function App() {
  return (
    <div >
      <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/devdb" element={<UserDb/>} />
    <Route path="/emp" element={<Emp />} />
    </Routes>


    </div>
  );
}

export default App;
