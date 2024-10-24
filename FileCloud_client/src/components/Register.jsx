import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'


const Register = ()=>{
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()


    const handleRegister = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://127.0.0.1:8000/api/users/register/', {
                username,
                email,
                password,
            });
            alert('Registration successfull')
            navigate('/')
        }catch(error){
            alert('Registration failed')
        }

    }

    return (
        
        <div className="mainlogin">
            <div className="part1">
                <img src="https://cdn.filecloud.com/wp-content/uploads/2017/10/filecloud-logo-460x111-white.png" alt="File Cloud" />
            </div>
            <div className="part2">
                <form onSubmit={handleRegister}>
                    <h2>Register</h2>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Register</button>
                    <p>Already have a Account??<Link to="/" className="register"> Login</Link></p>
                </form>
            </div>
            
        </div>
    );
};

export default Register;
