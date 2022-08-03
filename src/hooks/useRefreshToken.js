import axios from '../api/index';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    
    const refresh = async () => {
        const response = await axios.post('/auth/refresh-token', {},{
            withCredentials: true
        });
        // console.log(`response for refresh token: ${response}`)
        setAuth(prev => {
            return { ...prev, access_token: response.data.access_token, id: response.data.id, username: response.data.username}
        })
        return response.data.access_token
    }
    return refresh
}

export default useRefreshToken;