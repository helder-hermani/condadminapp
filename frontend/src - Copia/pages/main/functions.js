import {validateLogin} from '../../services/crypt';
import axiosApi from '../../services/axios';

export async function doLogin(userMail, password){
    const resolve = await axiosApi.get(`/getuserlogin/${userMail}`);
    const userData = resolve.data;
    console.log(userData);
}