import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();


const baseURL = axios.create({
    baseURL: "http://localhost:9090" || ''
})

export const getUserByUsername = async (username) => {
    
    const response = await baseURL.get(`/users/getUserByUsername/${username}`)
    return response
}

export const addScorecard = async (scorecard) => {
    return await baseURL.post('/scorecards/createScorecard/', scorecard)
}

export const updateScorecard = async (scorecard) => {
    return await baseURL.patch(`http://localhost:9090/scorecards/updateScorecard/${scorecard.id}}`, scorecard)
}

export default baseURL;