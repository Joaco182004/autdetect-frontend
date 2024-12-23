import { useState } from 'react'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import List from './pages/List';
import Evaluation from './pages/Evaluation';
import MCHAT from './pages/MCHAT';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import ActivateAccount from './pages/ActivateAccount';
import ChangePassword from './pages/ChangePassword';
import Error404 from './pages/Error404';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/changepassword' element={<ChangePassword/>}></Route>
      <Route path="/activate/:activation_key" element={<ActivateAccount />} />
      <Route path="/login" element={ <Login/>} />
      <Route element={<PrivateRoute />}>
        
        <Route path="app" element={<Dashboard />}>
        <Route path="dashboard" element={<Home />} />
        <Route path="pacientes" element={<List />} />
        <Route path='evaluaciones' element={<Evaluation />}></Route>
        <Route path='evaluaciones/mchat' element={<MCHAT />}></Route>
        <Route path='perfil' element={<Profile />}></Route>
        </Route>
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
