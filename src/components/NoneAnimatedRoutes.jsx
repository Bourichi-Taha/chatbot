import React from 'react'
import Login from '../pages/Login'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './Layout';
import Register from '../pages/Register';

const NoneAnimatedRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
                <Route path='/login' element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    )
}

export default NoneAnimatedRoutes