import React,{useState}  from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import "../App.css";

const Login = ()=>{
    const [username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(' http://127.0.0.1:8000/api/users/login/',{
                username,
                password,
            });
            sessionStorage.setItem('token',response.data.access);
            alert('Login Successfull');
            navigate('/home')
        }
        catch(error) {
            alert('Login Failed');

        }
    };
    
    return (
        <div className="mainlogin">
            <div className="part1">
            <img src="https://cdn.filecloud.com/wp-content/uploads/2017/10/filecloud-logo-460x111-white.png" alt="File Cloud" />
            </div>
            <div className="part2">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                    <p>Don't have an account??<Link to="/register" className="register"> Register Now</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login