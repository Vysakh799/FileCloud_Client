import React,{useEffect, useState} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../App.css";
import docs from '../assets/docs.png';
import {useNavigate} from 'react-router-dom'


const Home = () =>{
    const [files, setFiles] =useState([]);
    const navigate=useNavigate()


    useEffect(() =>{
        const fetchFiles=async()=>{
            try{
                const response=await axios.get('http://127.0.0.1:8000/api/files/',{
                    headers:{
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                setFiles(response.data);
            }
            catch(error){
                console.error("Error fetching files:",error)
                if (error.response && error.response.status >= 400 && error.response.status < 500) {
                    // Redirect to error page on 400-series errors
                    console.log("error")
                    navigate('/');
                  }
            }
        };
        fetchFiles();
    }, []);
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
                            <Link to="/home" className="serv active">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="serv"><span className="material-symbols-outlined">person</span></Link>
                        </li>
                        <li>
                            <Link to="" className="serv" onClick={logout}><span className="material-symbols-outlined">logout</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="main2">
            <div className="sidebar">
                <div className="top">
                    <div className="head">Your Folders</div>
                    <hr />
                    <div className="folder_name file_folder1 ">
                    <span className="material-symbols-outlined icn">
apps
</span>All
                    </div>
                    <div className="folder_name file_folder2">
                    <span className="material-symbols-outlined icn">
image
</span>Photos
                    </div>
                    <div className="folder_name file_folder3">
                    <span className="material-symbols-outlined icn">
movie
</span>videos
                    </div>
                    <div className="folder_name file_folder4">
                    <span className="material-symbols-outlined icn">
description
</span>Documents
                    </div>
                </div>
                <div className="bottom">
                    <div className="folder_name file_folder3">
                    <span className="material-symbols-outlined icn">
settings
</span>Settings
                    </div>
                    <div className="folder_name file_folder4">
                        Version 3.4
                    </div>
                </div>
            </div>
            <div className="content">
            <h2>Your Files</h2>
            <div className="files">
            <ul>
                {files.map((file)=>(
                    <li key={file.id} className="truncated-text">
                        <div className="sfile">
                            <img src={docs} alt="" />
                            <a href={`${file.uploaded_file}`} target="_blank">{file.uploaded_file.split("/")[4]}</a>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
            <div className="addfile">
            <Link to={'/fileupload'}><span className="material-symbols-outlined  uicn">
add
</span></Link>
            </div>
            </div>
            </div>
        </div>
    );  
};

export default Home;