import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext'

//pages & components
import Login from './pages/Login'
import Signup from './pages/CreateAppUser'
import Home from './pages/Home'
import CreateNewEmployee from './pages/CreateNewEmployee'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={!user ? <Login /> : <Navigate to="/home"/>}/>
            <Route path="/signup" element={user ? <Signup /> : <Navigate to="/"/>}/>
            <Route path="/home" element={user ? <Home /> : <Navigate to="/"/>}/>
            <Route path="/createNewEmployee" element={<CreateNewEmployee />}/>
            <Route path="/test" element={<CreateNewEmployee />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
