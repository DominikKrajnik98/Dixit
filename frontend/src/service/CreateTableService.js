import axios from 'axios';
import {API_URL} from '../RestApi'

class CreateTableService{

    createNewTable(name){
        const userName = localStorage.getItem('Name');
        const options = {headers:{'Name':userName}};
        return axios.post(`${API_URL}/addTable/${name}`,{},options)
    }
    
}

export default new CreateTableService()