import React from 'react';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login')
  }

    return <>
    <button onClick={signOut}>Sign out</button>
    </>
    
}

export default Navigation;