import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/fileupload" element={<FileUpload/>} />
      </Routes>
    </Router>
  );
};
export default App;