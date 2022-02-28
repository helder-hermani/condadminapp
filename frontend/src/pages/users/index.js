import {useHistory} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';

import {axiosPhp} from '../../services/axiosphp';
import {listActionBarContext} from '../../components/listActionBar/context';

import styles from './styles.css';

import AppHeader from '../../components/appheader';
import AppFooterMenu from '../../components/appfootermenu';
import FloatMsgBox from '../../components/floatMsgBox';
import {msgBoxContext} from '../../components/floatMsgBox/context';
import Spinning from '../../components/spinning';
import ListActionBar from '../../components/listActionBar';

import {getUserLoggedData, getStoredToken, authorized} from '../../services/authorization';

import {FaCheck, FaLightbulb} from 'react-icons/fa';


export default function MyUsers(){
    const rotas = useHistory();
    const {hasSelection, setHasSelection} = useContext(listActionBarContext);
    const {setVisible, setMsgTitle, setMsgText, setInnerContextAction, setAction, setMsgActionLabel, setTptTypeMsg} = useContext(msgBoxContext);
    const [spinningVisible, setSpinningVisible] = useState(0);

    const [authUser, setAuthUser]=useState({});
    const [queryUsers, setQueryUsers]=useState([]);

    const [selectedItem, setSelectedItem] = useState(0);
    const [strSelectedUserData, setStrSelectedUserData] = useState("");
    
// ==============================================================================================
    useEffect(async ()=>{
        authorization();

        const currentUser = getUserLoggedData("condAdminUser");
        const getListUsers = await axiosPhp.post("/users/listusers.php",
            {
                isManager: parseInt(currentUser.isManager),
                apartamento: parseInt(currentUser.apartamento),
                currentUser: parseInt(currentUser.index)
            }
        );

        setQueryUsers(getListUsers.data);
        setHasSelection(false);
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

    function pickUser(isSelected, idPick){
        const pickUserData = queryUsers.filter(el=>el.index==idPick);
        setStrSelectedUserData(JSON.stringify(pickUserData[0]));
        setHasSelection(!isSelected);
        setSelectedItem(idPick);
    }

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
                <h2>Meus Usuários</h2>
                <hr></hr>
                <div className='instruction'>
                    <FaLightbulb size={18} color="orange" />
                    <p>Clique no usuário para selecionar</p>
                </div>
                <div className='users-board'>
                {
                    queryUsers.map(el => (
                        <div className={`myUser-frame ${hasSelection && selectedItem == el.index ? 'myUser-frame-selected' : ''}`} key={el.index} onClick={()=>pickUser(hasSelection, el.index)}>
                            <div className='div-avatar'>
                                <div className='avatar' style={{backgroundImage: `url(${el.avatarUrl})`}}></div>
                            </div>
                            <div className='div-details'>
                                <p className='div-detail-userName'>{el.nomecompleto}</p>
                                <div>
                                    <p>Apartamento: {el.aptoDesc}</p>
                                    <p>{el.aptoCompDesc}</p>
                                </div>
                                <p>{el.email}</p>
                            </div>
                            <div className='div-selected'>
                                <FaCheck size={18} color={hasSelection && selectedItem == el.index ? '#0d2409' : 'rgba(0,0,0,.2)'} key={el.index}/>
                            </div>
                        </div>
                    ))
                }
                </div>
                
            </div>
            <ListActionBar
                addRoute="/users/new"
                editRoute="/users/edit"
                deleteRoute={`/users/delete/${selectedItem}`}
                lockRoute="/users/lock"
                editCallback="storeSelectedUser"
                deleteCallback="storeSelectedUser"
                generalData={strSelectedUserData}
            />
            <div className="hideElement">
                <AppFooterMenu/>
            </div>

        </div>
    )
}