import styles from './styles.css';
import AppFooterMenu from '../appfootermenu';

import Logo from '../../assets/pics/logo-rio-jordao.gif';

export default function AppHeader(){
    return(
        <div className="appheader-container">
            <div className="div-logo">
                <img src={Logo} alt="Logo do Condomínio Rio Jordão" />
                <div className="appheader-menu">
                    <AppFooterMenu />
                </div>
            </div>
            <div className="appheader-user">
                <div className="appheader-user-avatar">
                    <div className="user-avatar"></div>
                </div>
                <div className="user-infos">
                    <span>Olá, </span>
                    <span>Helder Hermani Almeida e Sousa</span>
                    <span>Apartamento 403 - Proprietário</span>
                </div>
            </div>
        </div>
    )
}