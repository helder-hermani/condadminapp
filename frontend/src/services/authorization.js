import {myDecrypt} from './myCrypt';
import {axiosPhp} from '../services/axiosphp';


export function getFutureDate(qtdDays){
    const valQtdDays = qtdDays * 86400000;
    const baseDate = new Date(0);
    const currentDate = new Date();
    const valToday = currentDate - baseDate;
    return new Date(valToday+valQtdDays);
}

export function getStoredToken(storedData){
    if (storedData == null){
        return {
            token: "0",
            index: -1
        }
    }else{
        return {
            token: storedData.token,
            index: parseInt(storedData.index)
        }
    }
}

export function authorized(userData, validToken){

    if(validToken.length==0){
        return false
    }else{
        //Checar se o token está na data de validade
        // debugger;
        const currentDateTime = new Date();
        const expires = new Date(validToken[0].expires);

        if (expires-currentDateTime<=0){
            return false;
        }
    }

    return true;

}


export function getUserLoggedData(localStorageKey){
    const storedData = localStorage.getItem(localStorageKey);

    if (storedData == null){
        return false;
    }

    const userData = JSON.parse(storedData, (key,value)=>
        typeof value === 'string'
        ? myDecrypt(value) 
        : value
    )

    return userData;
}

export async function logOff(localStorageKey){
    const loggedUser = getUserLoggedData(localStorageKey);
    const userData = {
        token: loggedUser.token,
        index: loggedUser.index
    }

    const resolve = await axiosPhp.post("/users/resetAuthToken.php", userData);

    localStorage.removeItem(localStorageKey);
}