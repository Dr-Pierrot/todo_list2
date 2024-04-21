import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePosts from './pages/CreatePosts';
import Post from './pages/Post';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState();
  
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/validate', 
      {headers:
        {accessToken:localStorage.getItem('accessToken')}
      })
      .then((response)=>{
        if(response.data.error){
          setAuthState(false);
        }else{
          setAuthState(true);
        }
      })
  },[])
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>
            <Link to="/home">Home</Link>
            <Link to="/createPost">Create Post</Link> 
            {!authState && (
                <>
                  <Link to="/login">Login</Link>  
                  <Link to="/signup">Signup</Link>
                </>
              )
            }  
          </div>
          <Routes>
            <Route path='/home' Component={Home}/>
            <Route path='/createPost' Component={CreatePosts}/>
            <Route path='/post/:id' Component={Post}/>
            <Route path='/login' Component={Login}/>
            <Route path='/signup' Component={Signup}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
