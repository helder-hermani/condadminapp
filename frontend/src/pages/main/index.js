import {cloneElement, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {validateLogin} from '../../services/crypt';
import {axiosPhp} from '../../services/axiosphp';
import {msgBoxContext} from '../../components/floatMsgBox/context';
import styles from './styles/index.css';
import Logo from './assets/logo-rio-jordao.gif';

import {v4 as uuid} from 'uuid';
import {FaUser, FaKey} from 'react-icons/fa';
import FloatMsgBox from '../../components/floatMsgBox';
import { myCrypt } from '../../services/myCrypt';
import {getFutureDate} from '../../services/authorization';


// import {doLogin} from './functions';

export default function Main(){
    const {setVisible, setMsgTitle, setMsgText, setInnerContextAction, setAction, setMsgActionLabel, setTptTypeMsg} = useContext(msgBoxContext);
    const rotas = useHistory();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function generateValidation(){
        // debugger;
        var validation="";
        for (var i=1;i<=6;i++){
            const randomIndex = Math.floor(Math.random() * (9 - 0)) + 0;
            validation = validation + randomIndex.toString();
        }
        return validation.toString();
    }

    //Etapa 1: Verificar se o usuário existe
    //  Se não existir, exibe mensagem de erro
    //Etapa 2: Verificar se a senha confere (comparação hash e salt)
    //  Se não conferir, exibe menagem de erro
    //Etapa 3: Verificar se está bloqueado
    //  Se for bloqueado, encaminha para página de erro
    //  Se não for bloqueado, verifica se é senha inicial
    //Etapa 4: Verificar se é senha inicial
    //  Se for inicial, encaminha para a rota de alteração de senha
    //  Se não for inicial, encaminha para a rota Main
    async function doLogin(userMail, password){
        const resolve = await axiosPhp.get(`/users/seekuser.php?email=${userMail}`);
        const userData = resolve.data;
        console.log(userData);
        

        if (userData.length){   //Etapa1: caso o usuário existe
            console.log("usuário existente");
            const validPassword = validateLogin(password, userData[0].salt, userData[0].hash);
            if (validPassword) {    //Etapa2: a senha é válida
                console.log("Senha é válida");
                    if (parseInt(userData[0].blocked) == false){    //Usuário bloqueado?
                        console.log("usuário não está bloqueado");
                        if (parseInt(userData[0].inicialPassword)){  //Etapa3: é senha inicial
                            // const validation = generateValidation();
                            // await resetPassword(userData[0], validation);
                            await resetPassword(userData[0]);
                        }else{
                            console.log("Agora sim, faz login!");
                            const authToken = uuid();
                            const expires = getFutureDate(1);

                            const insertAuthToken = {
                                token: authToken,
                                index: userData[0].index,
		                        expires : expires
                            }

                            const resolveResetAuth = await axiosPhp.post("/users/resetAuthToken.php",
                                {
                                    token: "000",
                                    index: insertAuthToken.index
                                })

                            const resolveInsertToken = await axiosPhp.post("/users/insertlogintoken.php", insertAuthToken);
                            
                            const userLogged = {
                                token: myCrypt(authToken),
                                index : myCrypt(userData[0].index),
                                profile : myCrypt(userData[0].profile),
                                role: myCrypt(userData[0].role),
                                id: myCrypt(userData[0].id),
                                apartamento : myCrypt(userData[0].apartamento),
                                apartamentoComp : myCrypt(userData[0].apartamentoComp),
                                avatarUrl : myCrypt(userData[0].avatarUrl),
                                nomecompleto : myCrypt(userData[0].nomecompleto),
                                email : myCrypt(userData[0].email),
                                aptoDesc : myCrypt(userData[0].aptoDesc),
                                aptoCompDesc : myCrypt(userData[0].aptoCompDesc),
                                descProfile : myCrypt(userData[0].descProfile),
                                roleDesc : myCrypt(userData[0].roleDesc),
                                isManager: myCrypt(userData[0].isManager)
                            }

                            console.log(JSON.stringify(userLogged));
                            localStorage.setItem("condAdminUser", JSON.stringify(userLogged));
                            rotas.push("/home");
                        }
                    }else{
                        console.log("Usuário bloqueado");
                        rotas.push(`/error/blocked@${userData[0].nomecompleto}`);
                    }
            }else{  //Etapa2: a senha é inválida
                console.log("Senha é inválida");
                rotas.push(`/error/fail@${userData[0].nomecompleto}`);
            }
        }else{  //Etapa1: caso o usuário não exista
            console.log("usário inexistente");
            rotas.push("/error/forbidden");
        }
    }

    async function doResetPassword(userMail){
        const resolve = await axiosPhp.get(`/users/seekuser.php?email=${userMail}`);
        const userData = resolve.data;
        console.log(userData);
        debugger;

        if (userData.length){   //Etapa1: caso o usuário existe
            if (parseInt(userData[0].blocked) == false){
                // const validation = generateValidation();
                // const resolve = await axiosPhp.get(`http://syscoderweb.com/phpapi/admcondominios/testmail.php?validation=${validation}&username=${userData[0].nomecompleto}&dest=${userData[0].email}`);
                // console.log("Envio de email: ", resolve)
                await resetPassword(userData[0]);
            }else{
                console.log("Usuário bloqueado");
                rotas.push(`/error/blocked@${userData[0].nomecompleto}`);
            }
        }else{  //Etapa1: caso o usuário não exista
            // rotas.push("/error/forbidden");
            setVisible(true);
            setMsgTitle("Usuário não informado");
            setMsgText("Para alterar a senha, informe seu usuário (e-mail) e clique em 'Esqueci minha senha!'. Você será direcionado para a página com as orientações.");
            setAction("close");
            setTptTypeMsg("error");
            setMsgActionLabel("Voltar para Login");
        }

    }

    // async function resetPassword(userData, validation){
    async function resetPassword(userData){
        console.log("redirecionar para redefinição de senha");
        const validation = generateValidation();
        const dataInsert = {
            token:uuid(),
            validation: validation,
            userIndex: userData.index,
            userName : userData.nomecompleto,
            firstAccess: userData.inicialPassword,
            email: userData.email
        }
        const sanatize = await axiosPhp.get(`/password/sanatizeTokenTable.php?userIndex=${dataInsert.userIndex}`);
        const resolve = await axiosPhp.post("/password/passwordinserttoken.php", dataInsert);
        console.log("Resultado: ", resolve);
        const sanatizeClear = await axiosPhp.get(`/password/sanatizeTokenTable.php?userIndex=`);
        console.log("Resultado: ", sanatizeClear);
        console.log(dataInsert.email);
        const resolveMail = await axiosPhp.get(`http://syscoderweb.com/phpapi/admcondominios/testmail.php?validation=${dataInsert.validation}&username=${dataInsert.userName}&dest=${dataInsert.email}`);
        // const resolve = await axiosPhp.get("http://syscoderweb.com/phpapi/admcondominios/testmail.php?validation=" + dataInsert.validation + "&dest=" + dataInsert.email);
        console.log("Envio de email: ", resolveMail)
        rotas.push(`/resetpassword/${dataInsert.token}`);
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
                        <p>Acesso à área exclusiva</p>
                        <div>
                            <FaUser size={16} color="#464343" />
                            <input required type="email" name="txtLogin" placeholder="Usuário" onChange={(e)=>setUserEmail(e.target.value)} />
                        </div>
                        <div>
                            <FaKey size={16} color="#464343" />
                            <input required type="password" name="txtPassword" placeholder="Senha" onChange={(e)=>setUserPassword(e.target.value)}/>
                        </div>
                        <div>
                            <p className="p-reset-password" onClick={()=>doResetPassword(userEmail)}>Esqueci minha senha!</p>
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