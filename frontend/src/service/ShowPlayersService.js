import axios from 'axios';
import {API_URL} from '../RestApi'

class ShowPlayersService {

    getAllUsers(name){
        return axios.get(`${API_URL}/allUsers/${name}`);
    }

    getAllPlayers(id){
        return axios.get(`${API_URL}/table/${id}/getPlayers`)
    }
}

export default new ShowPlayersService()