import {useHistory} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';

import {axiosPhp} from '../../../services/axiosphp';

import styles from './styles.css';

import AppHeader from '../../../components/appheader';
import AppFooterMenu from '../../../components/appfootermenu';
import FloatMsgBox from '../../../components/floatMsgBox';
import {msgBoxContext} from '../../../components/floatMsgBox/context';
import Spinning from '../../../components/spinning';
import ListActionBar from '../../../components/listActionBar';

import {getUserLoggedData, getStoredToken, authorized} from '../../../services/authorization';


export default function DeleteUser(){
    const rotas = useHistory();
    const {setVisible, setMsgTitle, setMsgText, setInnerContextAction, setAction, setMsgActionLabel, setTptTypeMsg, doAction} = useContext(msgBoxContext);
    const [spinningVisible, setSpinningVisible] = useState(0);

    const [authUser, setAuthUser]=useState({})

    const [userIndex, setuserIndex] = useState(0);
    const [nomecompleto, setNomeCompleto] = useState("");
    const [apartamento, setApartamento] = useState("");
    const [apartamentoComp, setApartamentoComp] = useState("");
    const [perfil, setPerfil] = useState("");
    
// ==============================================================================================
    useEffect(async ()=>{
        authorization();

        const userDeleteData = JSON.parse(localStorage.getItem("userDeleteData"));
        setuserIndex(parseInt(userDeleteData.index));
        setNomeCompleto(userDeleteData.nomecompleto);
        setApartamento(userDeleteData.aptoDesc);
        setApartamentoComp(userDeleteData.aptoCompDesc);
        setPerfil(userDeleteData.descProfile);
        // localStorage.removeItem("userDeleteData");
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

    async function deleteUser(){
        const rotaApi = `/users/deleteuser.php?userindex=${userIndex}`;
        console.log(rotaApi);
        const resolve = await axiosPhp.get(rotaApi);
        console.log(resolve);


        if (resolve.data != false){
            setInnerContextAction(false);
            setVisible(true);
            setMsgTitle("Usuário Excluído com sucesso.")
            setMsgText("Usuário excluído com sucesso");
            setTptTypeMsg("success");
            setAction("gopannel");
            setMsgActionLabel("Voltar ao painel");
        }else{
            setInnerContextAction(true);
            setVisible(true);
            setMsgTitle("Falha no processamento")
            setMsgText("Ocorreu algum erro no sistema. Usuário não deletado.");
            setTptTypeMsg("error");
            setAction("close");
            setMsgActionLabel("Voltar");
        }
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
                
                <p className='p-text'>Tem certeza que deseja excluir definitivamente usuário <strong>{nomecompleto}</strong>?</p>
                <p className='p-text warning'>Ao confirmar, o usuário não poderá ser recuperado.</p>
                <div className='div-userInfo'>
                    <p><strong>Nome:</strong></p>
                    <p>{nomecompleto}</p>
                    <p><strong>Apartamento:</strong></p>
                    <p>{apartamento} {apartamentoComp}</p>
                    <p><strong>Perfil:</strong></p>
                    <p>{perfil}</p>
                </div>

                <div className="div-bar-saveCancel">
                    <input type="button" className='btnForm btnSave' value="Deletar" onClick={()=>deleteUser()}/>
                    <input type="button" className='btnForm btnReturn' value="Cancelar" onClick={()=>rotas.goBack()}/>
                </div>
            </div>

            <div className="hideElement">
                <AppFooterMenu/>
            </div>

        </div>
    )
}