import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Login } from './pages/Login/Login'
import { MyBoards } from './pages/MyBoards/MyBoards'
import { Registration } from './pages/Registration/Registration'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="registration" element={<Registration />}></Route>
        <Route path="myboards" element={<MyBoards />}></Route>
    </Routes>
  );
}

export default App;
