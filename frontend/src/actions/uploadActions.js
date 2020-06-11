import {UPLOAD_IMAGE} from "./types";
import axios from "axios";
import {ACCESS_TOKEN, API_BASE_URL} from './Constants';





export const uploadImage = (imageData) => async dispatch => {
    if (imageData.entries().next().value[1] !== null) {
        const response = await axios.post(axios.defaults.baseURL +`/posts/addPost`, imageData, {
           headers: {
               'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
               'Content-Type' : 'application/json',
               'Accept' : 'application/json',
           }
        });
        dispatch({
            type: UPLOAD_IMAGE,
            payload: response.data
        });
    }
};