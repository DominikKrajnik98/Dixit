import axios from 'axios';
import {API_URL} from '../RestApi'

class LogInFormService {

    sendNewUser(name){
        return axios({
            method: 'post',
            url:`${API_URL}/addNewUser/${name}`});
    }
}

export default new LogInFormService()