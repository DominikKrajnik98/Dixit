import axios from 'axios';
import {API_URL} from '../RestApi'

class ImagesService{

    getImages(id){
        const userName = localStorage.getItem('Name');
        const options = {headers:{'Name':userName}};
        return axios.post(`${API_URL}/table/${id}/getImages`,{},options)
    }

    getTourInfo(id){
        return axios.get(`${API_URL}/table/${id}/getTour`);
    }

    sendPick(id,body){
        return axios.post(`${API_URL}/table/${id}/sendHeadPick`,body,{});
    }

    getPickedImages(id){
        return axios.get(`${API_URL}/table/${id}/getPickedImages`)
    }

    sendSecondPick(id,body){
        return axios.post(`${API_URL}/table/${id}/sendSecondPick`,body,{});
    }

    getResults(id){
        return axios.get(`${API_URL}/table/${id}/getResults`)
    }

    getPlayersVotes(id){
        return axios.get(`${API_URL}/table/${id}/cardsVotes`)
    }

    getCardsSigns(id){
        return axios.get(`${API_URL}/table/${id}/cardsSigns`)
    }
}

export default new ImagesService()