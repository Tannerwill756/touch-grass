import axios from '../api/index';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();
    
    const refresh = async () => {
        const response = await axios.post('/auth/refresh-token', {},{
            withCredentials: true
        });
        // console.log(`response for refresh token: ${response}`)
        setAuth(prev => {
            console.log("CURRENT auth state before rewrite: ", auth);
            console.log("previous auth state: ",JSON.stringify(prev));
            console.log("NEW token: ",response.data.access_token);
            return { ...prev, access_token: response.data.access_token}
        })
        return response.data.access_token
    }
    return refresh
}

export default useRefreshToken;