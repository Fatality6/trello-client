import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Login } from './pages/Login/Login'
import { Registration } from './pages/Registration/Registration'

function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="registration" element={<Registration />}></Route>
    </Routes>
    <ToastContainer position="bottom-right" hideProgressBar />
  </>
  );
}

export default App
