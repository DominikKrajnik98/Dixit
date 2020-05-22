import axios from 'axios';
import {API_URL} from '../RestApi'

class WaitingRooomService{

    retriveAllTables(){
        return axios.get(`${API_URL}/getTables`);
    }

    retriveTable(id){
        return axios.get(`${API_URL}/getTable/${id}`);
    }

    addPlayer(id){
        const userName = localStorage.getItem('Name');
        return axios.post(`${API_URL}/addPlayerToTable/${id}/${userName}`);
    }

}

export default new WaitingRooomService()