import React from 'react';
//? importando route 
import {Navigate,Route, Routes} from 'react-router-dom';
//? elementos adicionale 
import {Navigation} from './componest/Navigation';
import {HomePage, PokemonPage, SearchPage} from './pages';

export const AppRouter = () => {
    return ( 
        <Routes>
            <Route paht='/' element={<Navigation/>}>
                <Route index element={<HomePage/>} />
                <Route path='pokemon/:id' element={<PokemonPage />} />
                <Route path='search' element={<SearchPage/>} /> 
            </Route>

            <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
    );
};