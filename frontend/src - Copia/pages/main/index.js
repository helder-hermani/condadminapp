import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './styles/index.css';
import Logo from './assets/logo-rio-jordao.gif';

import {FaUser, FaKey} from 'react-icons/fa';

import {doLogin} from './functions';

export default function Main(){
    const rotas = useHistory();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return(
        <div className="container">
            <section className="left-side">
                <header className="cabecalho">
                    <div>
                    </div>
                    <div>
                        <p>Rua Vicente Barbosa, 52</p>
                        <p>Jardim Oceania</p>
                        <p>João Pessoa - Paraíba</p>
                    </div>
                </header>
                <main>
                    <img src={Logo} alt="Logo do Condomínio Rio Jordão" className="logo-bigscreen"/>
                    <div className="loginFrame">
                        <p>Acesso à área exclusiva</p>
                        <div>
                            <FaUser size={16} color="#464343" />
                            <input type="text" name="txtLogin" placeholder="Usuário" onChange={(e)=>setUserEmail(e.target.value)} />
                        </div>
                        <div>
                            <FaKey size={16} color="#464343" />
                            <input type="password" name="txtPassword" placeholder="Senha" onChange={(e)=>setUserPassword(e.target.value)}/>
                        </div>
                        <div>
                            <p className="p-reset-password">Esqueci minha senha!</p>
                        </div>
                        <div className="divBtnAcessar">
                            <a onClick={()=>doLogin(userEmail, userPassword)}>ACESSAR</a>
                            {/* <a onClick={()=>rotas.push("/home")}>ACESSAR</a> */}
                        </div>
                    </div>
                </main>
                <footer>
                    <p className="footer-credit">Desenvolvido por SyScoder Web</p>
                </footer>
            </section>

            <section className="right-side">
                 
            </section>

        </div>
    )
}