
import axios from 'axios';
import Home from './Pages/Home/Home';
import Signup from './Pages/Auth/Signup';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import NavbarLayout from './components/NavbarLayout';
function App() {

  return (
  <div className=' min-h-screen'>
      <Router>

          <Routes>
            <Route element={<NavbarLayout/>}>


            <Route path='/' element={<Home/>}/>
              <Route path='/:token' element={<Home/>}/>

              <Route path='/signup' element={<Signup/>}/>
              </Route>
            </Routes>


      </Router>

  </div>

    )
}

export default App;