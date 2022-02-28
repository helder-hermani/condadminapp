import {useState, useEffect, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {gerarHash, gerarSalt} from '../../services/crypt';
import {axiosPhp} from '../../services/axiosphp';
import styles from './index.css';
import Logo from './assets/logo-rio-jordao.gif';

import {FaUser, FaKey, FaLock} from 'react-icons/fa';
import FloatMsgBox from '../../components/floatMsgBox';
import {msgBoxContext} from '../../components/floatMsgBox/context';

export default function ResetPassword(){
    const params = useParams();
    const rotas = useHistory();
    const {setVisible, setMsgTitle, setMsgText, setInnerContextAction, setAction, setMsgActionLabel, setTptTypeMsg} = useContext(msgBoxContext);
    const [tokenData, setTokenData] = useState([]);
    const [validationCode, setValidationCode] = useState("");
    const [tokenValidation, setTokenValidation] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    const [isFirstAccess, setIsFirstAccess] = useState(false);
    const [msgInfo, setMsgInfo] = useState("");    

    useEffect(async function(){
        const resolve = await axiosPhp.get(`/password/seekpasswordtoken?token=${params.token}`);
        console.log(resolve.data[0]);

        if (resolve.data.length == 0){ //Não foi encontrado token para reset de senha
            rotas.push("/error/forbidden");
            return;
        }else{  //Foi encontrado token para reset de senha
            setTokenData(resolve.data[0]);
            setTokenValidation(resolve.data[0].validation);
            if (parseInt(resolve.data[0].firstAccess)) {
                setMsgInfo("como este é seu primeiro acesso, será necessário alterar a senha inicial.");  
                // setValidationCode(resolve.data[0].validation);
                setIsFirstAccess(true);
            }
            // }else{   
            //     setMsgInfo("verifique em seu e-mail o código de validação enviado. Informe abaixo e escolha uma nova senha.");
            // }

        }
    },[]);

    async function doChangePassword(){
        if (userPassword != userConfirmPassword || userPassword==""){ //Fail na validação de senha
            let msgError = "";
            userPassword.trim() == "" ? msgError="Senha não pode ser nula." : msgError="Senha e confirmação precisam ser iguais.";
            setVisible(true);
            setMsgTitle("Senhas não conferem");
            setMsgText(msgError);
            setAction("close");
            setTptTypeMsg("error");
            setMsgActionLabel("Voltar");
        }else{  //Passou pela validação de senha
            console.log("Faz alteração de senha")
            if (validationCode==tokenValidation){
                const salt = gerarSalt();
                const cryptPassword = gerarHash(userPassword,salt);
                const data = {
                    newHash: cryptPassword.hash,
                    newSalt: salt,
                    userIndex : tokenData.userIndex,
                    token: tokenData.token
                }
                
                const resolve = await axiosPhp.post("/password/proceedChangePassoword.php", data);

                setVisible(true);
                setInnerContextAction(false);
                setMsgTitle("Senha alterada com sucesso");
                setMsgText("Agora você já tem uma nova senha de acesso.");
                setAction("gologin");
                setTptTypeMsg("success");
                setMsgActionLabel("Fazer Login");
                return;
            }else{
                setVisible(true);
                setInnerContextAction(true);
                setMsgTitle("Código de validação inválido");
                setMsgText("Verifique seu e-mail cadastrado e informe o código de validação correto.");
                setAction("close");
                setTptTypeMsg("error");
                setMsgActionLabel("Voltar");
            }
        }
    }

    return(
        <div className="container">
            <FloatMsgBox />
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
                        <p>Prezado {tokenData.userName}, {msgInfo} Verifique em seu e-mail o código de validação enviado, informe abaixo e escolha uma nova senha.</p>
                        <div className='loginField'>
                            <FaKey size={16} color="#464343" />
                            <input className='input-text' required type="password" name="txtLogin" placeholder="Nova Senha" onChange={(e)=>setUserPassword(e.target.value)} />
                        </div>
                        <div className='loginField'>
                            <FaKey size={16} color="#464343" />
                            <input className='input-text' required type="password" name="txtPassword" placeholder="Confirmação de Senha" onChange={(e)=>setUserConfirmPassword(e.target.value)}/>
                        </div>
                        <div className="loginField">
                            <FaLock size={16} color="#464343" />
                            <input className='input-text' required type="text" name="txtValidation" placeholder="Código de Validação" onChange={(e)=>setValidationCode(e.target.value)} />
                        </div>
                        <div>
                            <p className="p-reset-password">Atenção: utilizamos um algoritmo para autenticação, de forma que a senha cadastrada não é armazenada no servidor.</p>
                        </div>
                        <div className="divBtnAcessar">
                            <a onClick={()=>doChangePassword()}>ALTERAR SENHA</a>
                            {/* <a onClick={()=>doLogin(userEmail, userPassword)}>ACESSAR</a> */}
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