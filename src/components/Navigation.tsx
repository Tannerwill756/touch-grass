import React from 'react';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import JoinAccessCode from '../Pages/JoinAccessCode';

const Navigation = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login')
  }

    return <>
    <span>TOUCH GRASS</span>
    <button onClick={() => navigate('joincard')}>Join by Access Code</button>
    <button onClick={signOut}>Sign out</button>
    </>
    
}

export default Navigation;