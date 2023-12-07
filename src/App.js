import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profil from './Pages/Profil';
import Upload from './Pages/Upload';
import Moderators from './Pages/Moderators'
import Filtre from './Pages/Favoris';
import Search from './Pages/Search';
import Favoris from './Pages/Favoris';

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/home' element={<Upload/>}></Route>
        <Route path='/home1' element={<Search/>}></Route>
        <Route path='/favorite' element={<Favoris/>}></Route>
        <Route path='/filtre' element={<Filtre/>}></Route>
        <Route path='/moderators' element={<Moderators/>}></Route>
        <Route path='/profil' element={<Profil/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
