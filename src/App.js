import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Login } from './pages/Login/Login'
import { Registration } from './pages/Registration/Registration'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/auth/authSlice'
import { BoardPage } from './pages/Dashboard/BoardPage/BoardPage'

function App() {
  //при каждом обновлении страницы через dispatch вызывается getMe
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (<>
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="registration" element={<Registration />}></Route>
      <Route path=":id" element={<BoardPage />}></Route>
    </Routes>
    <ToastContainer position="bottom-right" hideProgressBar />
  </>
  );
}

export default App
