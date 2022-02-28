import {useHistory} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';

import {axiosPhp} from '../../services/axiosphp';

import styles from './styles.css';

import AppHeader from '../../components/appheader';
import AppFooterMenu from '../../components/appfootermenu';
import FloatMsgBox from '../../components/floatMsgBox';
import {msgBoxContext} from '../../components/floatMsgBox/context';
import Spinning from '../../components/spinning';
import ListActionBar from '../../components/listActionBar';

import {getUserLoggedData, getStoredToken, authorized} from '../../services/authorization';


export default function MyUsers(){
    const rotas = useHistory();
    const {setVisible, setMsgTitle, setMsgText, setInnerContextAction, setAction, setMsgActionLabel, setTptTypeMsg} = useContext(msgBoxContext);
    const [spinningVisible, setSpinningVisible] = useState(0);

    const [authUser, setAuthUser]=useState({})
    
// ==============================================================================================
    useEffect(async ()=>{
        authorization();
    },[])

    async function authorization(){
        const userData = getStoredToken(getUserLoggedData("condAdminUser"));
        setAuthUser(getUserLoggedData("condAdminUser"));

        const resolve = await axiosPhp.post("/users/getlogintoken.php", userData);
        const validToken = resolve.data;
        const authOK = authorized(userData, validToken);
        if (authOK == false){
            await axiosPhp.post("/users/resetAuthToken.php", userData);
            rotas.push("/error/expired");
        }else{
            console.log("Autenticado");
        }
    }
// ==============================================================================================

    return(
        <div className="home-container">
            <Spinning visible={spinningVisible} />
            <FloatMsgBox />
            <section className="section-appheader">
                <AppHeader 
                    name={authUser.nomecompleto} 
                    apto={authUser.aptoDesc}
                    aptoComp={authUser.aptoCompDesc}
                    profile={authUser.descProfile}
                    avatarUrl={authUser.avatarUrl}
                    role={authUser.roleDesc}
                />
            </section>
            <div className="section-painel2 page-content">
                
                {/* <ListActionBar /> */}
            </div>
            <ListActionBar
                addRoute="/users/new"
                editRoute="/users/edit"
                deleteRoute="/users/delete"
                lockRoute="/users/lock"
            />


            <div className="hideElement">
                <AppFooterMenu/>
            </div>

        </div>
    )
}