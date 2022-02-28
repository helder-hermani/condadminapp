import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './styles.css';

import AppHeader from '../../components/appheader';
import AppFooterMenu from '../../components/appfootermenu';

import {cardsPainel} from '../../innerjson/innerdata.js';

import {FaUsers, FaBinoculars} from 'react-icons/fa';

import {getUserLoggedData, getStoredToken, authorized} from '../../services/authorization';
import {axiosPhp} from '../../services/axiosphp';

export default function Mainpanel(){
    const myconst = cardsPainel;
    const rotas = useHistory();

    const [funcPanel, setFuncPanel] = useState(myconst);
    const [txtFilter, setTxtFilter] = useState("");
    const [authUser, setAuthUser]=useState({});

    useEffect(async function(){
        authorization();
    },[]);

    async function authorization(){
        const userData = getStoredToken(getUserLoggedData("condAdminUser"));
        // Lembrar de importar import {getUserLoggedData, getStoredToken, authorized} from '../../services/authorization';
        // Lembrar de definir const [authUser, setAuthUser]=useState({});
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

    function filterCards(filter){
        if (filter==""){
            setFuncPanel(myconst);
        }else{
            const filteredPanel = myconst.filter(e=>e.description.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
            setFuncPanel(filteredPanel);
        }
    }
    

    return(
        <div className="home-container">
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
                <div className="section-painel">
                    <div className="painel-top-label">
                        <h2>Painel</h2>
                        <div className="div-localizar">
                            <FaBinoculars size={24} color="rgba(0,0,0,.5)" />
                            <input
                                type="text"
                                name="txtFindCard"
                                className="txtFindCard"
                                placeholder="Filtrar funcionalidades"
                                onChange={(e)=>filterCards(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="cards">
                        {
                            funcPanel.map(x=> (
                                <div key={x.index} onClick={()=>rotas.push(x.route)}>
                                    <img src={x.icon} alt="Icone documentos"/>
                                    <p>{x.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="hideElement">
                    <AppFooterMenu/>
                </div>
        </div>
    )
}