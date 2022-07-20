import React from 'react';
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    console.log("current auth state",auth);

    return (
        auth.access_token ? <Outlet /> : <Navigate  to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth;