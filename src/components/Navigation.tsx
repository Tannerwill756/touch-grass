import React from 'react';
import axios from 'axios';
import useRefreshToken from '../hooks/useRefreshToken';

const Navigation = () => {
    const refresh = useRefreshToken();

    const handleLogout = () => {
        axios
      .delete(`http://localhost:9090/auth/session`, {
        withCredentials: true,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    }



    return <>
    <button onClick={() => refresh()}>refresh</button>
    <button onClick={handleLogout}>Sign out</button>
    </>
    
}

export default Navigation;