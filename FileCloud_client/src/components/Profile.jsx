import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../App.css";
import {useNavigate} from 'react-router-dom'


const Profile=()=>{
    const [user,setUser]=useState({})
    const navigate=useNavigate()


    useEffect(()=>{
            const fetchUser = async()=>{
        
                const token = sessionStorage.getItem('token');
                // console.log('token',token);
                try{
                const response = await axios.get('http://127.0.0.1:8000/api/users/me/',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                });
                // console.log(response.status)
                // console.log(response)
                if(response.status==200){
                    setUser(response.data);
                }

            }
            catch(error){
                console.log(error)
                if (error.response && error.response.status >= 400 && error.response.status < 500) {
                    // Redirect to error page on 400-series errors
                    // console.log("error")
                    navigate('/');
                  }
                }
            };
            fetchUser();}
        
        
            
    , []);
    const logout = () => {
        sessionStorage.removeItem('token');  // Remove JWT token from localStorage
        window.location.href = '/';    // Redirect to login page    
      };

    return (
        <div className="main">
            <nav className="navbar">
                <div className="logo">
                    <img src="https://cdn.filecloud.com/wp-content/uploads/2017/10/filecloud-logo-460x111-white.png" alt="File Cloud" />
                </div>
                <div className="search"><input type="text" name="" id="" placeholder="Search" />
                    <div className="searchlogo">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                </div>
                <div className="services">
                    <ul>
                        <li>
                            <Link to="/home" className="serv">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="serv active"><span className="material-symbols-outlined">person</span></Link>
                        </li>
                        <li>
                            <Link to="" className="serv" onClick={logout}><span className="material-symbols-outlined">logout</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="pmain">
                <div className="psidebar">
                <div className="profpic">
                    <img src="https://cdn-icons-png.freepik.com/512/7718/7718888.png" alt="" />
                    <div className="editicon">
                    <span className="material-symbols-outlined">edit</span>
                    </div>
                </div>
                <div className="details">
                {/* <h1>Profile</h1> */}
                <div className="folder_name file_folder1 ">
                    <span className="material-symbols-outlined icn">person</span>{user.username}
                    </div>
                    <div className="folder_name file_folder1 ">
                    <span className="material-symbols-outlined icn">mail</span>{user.email}
                    </div>

                </div>
                </div>
                <div className="pcontent">
                    <div className="storage">
                        <h2>Storage</h2>
                       <div className="storageview">
                       <div className="storagebar">
                            <div className="used"></div>
                        </div>
                        <div className="snumber">
                            535MB/5GB
                        </div>
                       </div>
                    </div>
                    <hr />
                    <div className="moreinfo">
                        <div className="icon">
                        <span className="material-symbols-outlined">
info
</span>
                        </div>
                        <div className="cont">
                            Addmore Personal info
                        </div>
                    </div>
                    <hr />
                    <div className="moreinfo">
                        <div className="icon">
                        <span className="material-symbols-outlined">
settings_backup_restore
</span>
                        </div>
                        <div className="cont">
                            Backup and Restore
                        </div>
                    </div>
                    <hr />
                    <div className="moreinfo">
                        <div className="icon">
                        <span className="material-symbols-outlined">
settings
</span>
                        </div>
                        <div className="cont">
                            Settings
                        </div>
                    </div>
                    <hr />
                    <div className="moreinfo">
                        <div className="icon">
                        <span className="material-symbols-outlined">
verified
</span>
                        </div>
                        <div className="cont">
                            Get Premium
                        </div>
                    </div>
                    <hr />
                    <div className="moreinfo">
                        <div className="icon">
                        <span className="material-symbols-outlined">
shield_locked
</span>
                        </div>
                        <div className="cont">
                            Two Step Varification
                        </div>
                    </div>
                    <hr />
                    <div className="moreinfo">
                        <div className="icon">
                        <span className="material-symbols-outlined">
support_agent
</span>
                        </div>
                        <div className="cont">
                            Need help?
                        </div>
                    </div>
                    <hr />

                </div>
            </div>
        </div>
    );
};

export default Profile