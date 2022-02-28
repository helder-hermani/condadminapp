import {useHistory} from 'react-router-dom';
import {FaHouseUser, FaBars, FaUserTie, FaPowerOff} from 'react-icons/fa';
import styles from './styles.css';

export default function AppFooterMenu(){
    const rotas = useHistory();

    return (
        <div className="appfootermenu-container">
            <div onClick={()=>rotas.push("/home")}>
                <FaHouseUser size={16} color="rgba(255,255,255,.8)" />
                <span>Início</span>
            </div>
            <div onClick={()=>rotas.push("/mainpanel")}>
                <FaBars size={16} color="rgba(255,255,255,.8)" />
                <span>Painel</span>
            </div>
            <div>
                <FaUserTie size={16} color="rgba(255,255,255,.8)" />
                <span>Perfil</span>
            </div>
            <div>
                <FaPowerOff size={16} color="rgba(255,255,255,.8)" />
                <span>Sair</span>
            </div>
        </div>
    )
}