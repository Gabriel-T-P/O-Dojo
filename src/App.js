import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Styles
import './App.css'

// Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import FriendsBar from './components/FriendsBar'

// Pages
import Create from './pages/create/Create'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (

    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Navigate to='/login' />} />
              <Route path='/create' element={user ? <Create /> : <Navigate to='/login' />} />
              <Route path='/projects/:id' element={user ? <Project /> : <Navigate to='/login' />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
            </Routes>
          </div>
          {user && <FriendsBar />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
