import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import { Toaster } from 'react-hot-toast'
import UserHomePage from './pages/UserHomePage'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainHomePage from './pages/CaptainHomePage'
function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignUp />} />
        <Route path='/home' element={<UserProtectedWrapper><UserHomePage /></UserProtectedWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectedWrapper><CaptainHomePage /></CaptainProtectedWrapper>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App