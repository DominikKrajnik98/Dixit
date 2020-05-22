import axios from 'axios';
import {API_URL} from '../RestApi'

class GameService{

    startGame(id){
        return axios.post(`${API_URL}/table/${id}/startGame`).then(()=>{console.log("game started");});
        
    }

    checkForStart(id){
        return axios.get(`${API_URL}/table/${id}/checkForStart`);
    }

    getCurrnetTour(id){
        return axios.get(`${API_URL}/table/${id}/getTour`);
    }
}

export default new GameService()