import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import "../App.css";


// const token = localStorage.getItem('token');
// print(token)
// if (token){
//     FileUpload()
// }
// else{
//     // window.location.href='/'
// }

const FileUpload=()=>{
    const [file,setFile]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        // console.log(token)
        if(!token){
            navigate('/')
        }
        
    },[navigate])

    const handleFileChange=(e)=>{setFile(e.target.files[0])};

    const handleFileUpload=async(e)=>{
        e.preventDefault()
        const formData=new FormData();
        formData.append('uploaded_file',file)

        try{
            await axios.post('http://127.0.0.1:8000/api/files/',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Bearer ${sessionStorage.getItem('token')}`
                }
            });
            alert('File Uploaded SuccessFully');
            navigate('/home')
        }catch(error){
            console.error("there was an error while uploading the file :",error)
            alert('File Upload Failed')
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                // Redirect to error page on 400-series errors
                console.log("error")
                navigate('/');
              }
        }
    }
    const logout = () => {
        sessionStorage.removeItem('token');  // Remove JWT token from localStorage
        window.location.href = '/';    // Redirect to login page
      };
    return (
        <div className='main'>
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
                            <Link to="/profile" className="serv"><span className="material-symbols-outlined">person</span></Link>
                        </li>
                        <li>
                            <Link to="" className="serv" onClick={logout}><span className="material-symbols-outlined">logout</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="contentf">
            <div className="uploadside">
            <span className="material-symbols-outlined upic">
upload
</span>
                <form onSubmit={handleFileUpload}>
                <h2>Drag and Drop here !!</h2><br />
                <h3>OR</h3>
                <div className="inputs"><input type="file" onChange={handleFileChange} required />
                <button type='submit'>Upload</button></div>
                </form>
            </div>
            </div>
        </div>
       
    )
}

export default FileUpload;