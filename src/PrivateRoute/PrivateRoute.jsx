import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../pages/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading}=use(AuthContext);
    // console.log(location)
    if(loading) return <Loading/>
    if(!user){
        return <Navigate state={location.pathname} replace to={"/auth/login"} />
    }
    return children
};

export default PrivateRoute;