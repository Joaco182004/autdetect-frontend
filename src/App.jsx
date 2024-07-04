import { useState } from 'react'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import List from './pages/List';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login/>} />
        <Route path="dashboard" element={<Dashboard />}>
        <Route path="" element={<Home />} />
        <Route path="list" element={<List />} />
        </Route>
        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
