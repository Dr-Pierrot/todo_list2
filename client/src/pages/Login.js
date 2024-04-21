import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

export default function Login() {
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);
    let navigate = useNavigate();

    const login = () => {
        
        try{
            axios.post("http://localhost:3001/auth/login", {username:username, password:password}).then((response)=>{
                if(response.data.error){
                    alert(response.data.error);
                }else{
                    localStorage.setItem("accessToken",response.data);
                    setAuthState(true);
                    navigate('/home');
                }
            })
        }catch(error){
            console.log(error);
        }
    }
    
    return (
    <div className='loginContainer'>
        <label>Username:</label>
        <input type='text' name='username' onChange={(e)=>{setUsername(e.target.value)}}/>
        <label>Password:</label>
        <input type='password' name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={login}>Login</button>
    </div>
  )
}
