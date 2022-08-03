import {Outlet} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch(error){
                console.log(error)
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth.access_token ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    useEffect(() => {
    },[isLoading])

  return (
    <>
        {isLoading ? <p>Loading...</p> : <Outlet />}
    </>
  )
}

export default PersistLogin