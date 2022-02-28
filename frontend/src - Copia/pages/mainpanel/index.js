import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './styles.css';

import AppHeader from '../../components/appheader';
import AppFooterMenu from '../../components/appfootermenu';

import {cardsPainel} from '../../innerjson/innerdata.js';

import {FaUsers, FaBinoculars} from 'react-icons/fa';

export default function Mainpanel(){
    const myconst = cardsPainel;
    const rotas = useHistory();

    const [funcPanel, setFuncPanel] = useState(myconst);
    const [txtFilter, setTxtFilter] = useState("");

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
                    <AppHeader />
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
                            funcPanel.map(x=> (
                                <div key={x.index} onClick={()=>rotas.push(x.route)}>
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