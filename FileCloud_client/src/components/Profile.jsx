import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';


const Profile=()=>{
    const [user,setUser]=useState({})

    useEffect(()=>{
        const fetchUser = async()=>{
            const token = localStorage.getItem('token');
            console.log('token',token);
            
            const response = await axios.get('http://127.0.0.1:8000/api/users/me/',{
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(response)
            if(response.status==200){
                setUser(response.data);
            }
            
        };
        fetchUser();
    }, []);

    return (
        <div className="main">
            <nav className="navbar">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
            <h1>Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email : {user.email}</p>
        </div>
    );
};

export default Profile