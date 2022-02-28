import styles from './styles.css';
import AppFooterMenu from '../appfootermenu';

import Logo from '../../assets/pics/logo-rio-jordao.gif';

export default function AppHeader(props){
    const name = props.name;
    const apto = props.apto;
    const aptoComp = props.aptoComp;
    const profile = props.profile;
    const avatarUrl = props.avatarUrl;
    const role = props.role;

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
                    <div className="user-avatar" style={{backgroundImage: `url(${avatarUrl})`}}></div>
                    {/* <div className="user-avatar" style={{backgroundImage: 'url(https://www.php.net/images/logos/php-logo.svg)'}}></div> */}
                    {/* <div className="user-avatar"></div> */}
                </div>
                <div className="user-infos">
                    <span>Olá, </span>
                    <span>{name}</span>
                    {/* <span>Helder Hermani Almeida e Sousa</span> */}
                    <span>Apartamento {apto} {aptoComp}</span>
                    <span>{profile} {role}</span>
                </div>
            </div>
        </div>
    )
}