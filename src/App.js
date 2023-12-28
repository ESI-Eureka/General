import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profil from './Pages/Profil';
import Upload from './Pages/Upload';
import Moderators from './Pages/Moderators'
import Filtre from './Pages/Filtre';
import SearchPage from './Pages/Search';
import Favoris from './Pages/Favoris';
import Details from './Pages/Details';

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<SearchPage/>}></Route>
        <Route path='/home' element={<Upload/>}></Route>
        <Route path='/home1' element={<SearchPage/>}></Route>
        <Route path='/favorite' element={<Favoris/>}></Route>
        <Route path='/filtre' element={<Filtre/>}></Route>
        <Route path='/moderators' element={<Moderators/>}></Route>
        <Route path='/profil' element={<Profil/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/Details' element={<Details/>}></Route>
        <Route path='/Upload' element={<Upload/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
