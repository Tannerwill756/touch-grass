import axios from '../api/index';
import useAuth from './useAuth';

const useLogout = () => {
    const {setAuth} = useAuth();
    const logout = async () => {
        setAuth({});
        try {
            await axios('/auth/logout', {
                withCredentials: true
            })
        }catch(err){
            console.log(err)
        }
    }
    return logout
}

export default useLogout;