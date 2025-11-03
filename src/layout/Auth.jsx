import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Auth = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Navigate to={'/auth/login'} />
        </div>
    );
};

export default Auth;