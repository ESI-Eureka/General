// import logo from './logo.svg';
// import './App.css';
//import Signup from './Pages/Signup';
//import Login from './Pages/Login';
import SearchPage from './Pages/Search';
import Filtre from './Pages/Filtre';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profil from './Pages/Profil';


function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element=''></Route>
        <Route path='/profil' element={<Profil/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
