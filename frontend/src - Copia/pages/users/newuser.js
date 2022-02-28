import {useHistory} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';

import firebase from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {firebaseApp} from '../../services/firebase';
import axiosApi from '../../services/axios';
import {gerarHash, gerarSalt, validateLogin} from '../../services/crypt';

import styles from './styles.css';

import {FaCameraRetro, FaEye, FaEyeSlash} from 'react-icons/fa'

import AppHeader from '../../components/appheader';
import AppFooterMenu from '../../components/appfootermenu';
import FloatMsgBox from '../../components/floatMsgBox';
import {msgBoxContext} from '../../components/floatMsgBox/context';
import Spinning from '../../components/spinning';


export default function NewUser(){
    const rotas = useHistory();
    const {setVisible, setMsgTitle, setMsgText, setInnerContextAction, setAction, setMsgActionLabel, setTptTypeMsg} = useContext(msgBoxContext);
    const [spinningVisible, setSpinningVisible] = useState(0);

    const [aptosList, setAptosList] = useState([]);
    const [aptosCompList, setAptosCompList] = useState([]);
    const [usersProfilesList, setUsersProfilesList] = useState([]);

    const [avatarSelectionUrl, setAvatarSelectionUrl] = useState("https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png");

    const [fileAvatar, setFileAvatar] = useState();

    const [avatarUrl, setAvatarUrl] = useState("default");
    const [userIsMaster, setUserIsMaster] = useState(0);
    const [userApto, setUserApto] = useState(1);
    const [userAptoComp, setUserAptoComp] = useState(1);
    const [userProfile, setUserProfile] = useState(0);
    const [userNomeCompleto, setUserNomeCompleto] = useState("");
    const [userFoneDDI, setUserFoneDDI] = useState(55);
    const [userFoneDDD, setUserFoneDDD] = useState(0);
    const [userFoneNumero, setUserFoneNumero] = useState(0);
    const [userWhatsDDI, setUserWhatsDDI] = useState(55);
    const [userWhatsDDD, setUserWhatsDDD] = useState("");
    const [userWhatsNumero, setUserWhatsNumero] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userTemPet, setUsertemPet] = useState(0);
    const [userTemVeic, setUsertemVeic] = useState(0);
    const [userSenha, setUserSenha] = useState("");
    const [userSenhaConfirm, setUserSenhaConfirm] = useState("");

    const [hidePassword, setHidePassword] = useState(1);
    const [typeInputPassword, setTypeInputPassword] = useState("password");
    const [hideConfirmPassword, setHideConfirmPassword] = useState(1);
    const [typeInputConfirmPassword, setTypeInputConfirmPassword] = useState("password");
    

    useEffect(async ()=>{
        var resolve = await axiosApi.get("/listaptos");
        const listaAptos = resolve.data;
        setAptosList(listaAptos);

        resolve = await axiosApi.get("/listaptoscomp");
        const listaAptosComp = resolve.data;
        setAptosCompList(listaAptosComp);

        resolve = await axiosApi.get("/listusersprofiles");
        const listaProfilesComp = resolve.data;
        setUsersProfilesList(listaProfilesComp);
    },[])

 

    async function uploadFileToFirebase(file){
        var urlXXX="";
        const storage = getStorage();
        const storageRef = ref(storage, '/users/avatars/' + file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        await uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                urlXXX = downloadURL;
                });
                setAvatarUrl(urlXXX);
                await insertUser(urlXXX);
            }
        );
    }

    async function sendAvatarToFirebase(){
        await uploadFileToFirebase(fileAvatar);
    }

    function toggleHidePassword(){
        hidePassword == 1 ? setTypeInputPassword("text") : setTypeInputPassword("password");
        setHidePassword(!hidePassword);
    }
    
    function toggleHideConfirmPassword(){
        hideConfirmPassword == 1 ? setTypeInputConfirmPassword("text") : setTypeInputConfirmPassword("password");
        setHideConfirmPassword(!hideConfirmPassword);
    }

    function placeFoneToZap(check){
        if (check.checked) {
            setUserWhatsDDI(userFoneDDI);
            setUserWhatsDDD(userFoneDDD);
            setUserWhatsNumero(userFoneNumero);
        }
    }


    function submitValidations(){
        // Validação da senha
        if (userSenha != userSenhaConfirm){
            return {
                validationOK: false,
                title: "Ops... alguma coisa está errada!",
                text: "Senhas não conferem!",
                action: "close",
                actionLabel: "Retornar e Resolver",
                innerContextAction: true,
                tptTypeMsg: "error"
            }
        }
        //Validação de FoneDDI
        if (isNaN(userFoneDDI)){
            return {
                validationOK: false,
                title: "Ops... alguma coisa está errada!",
                text: "DDI do telefone precisa ser apenas números!",
                action: "close",
                actionLabel: "Retornar e Resolver",
                innerContextAction: true,
                tptTypeMsg: "error"
            }
        } 
        //Validação de FoneDDD
        if (isNaN(userFoneDDD)){
            return {
                validationOK: false,
                title: "Ops... alguma coisa está errada!",
                text: "DDD do telefone precisa ser apenas números!",
                action: "close",
                actionLabel: "Retornar e Resolver",
                innerContextAction: true,
                tptTypeMsg: "error"
            }
        }
        //Validação de FoneNumero
        if (isNaN(userFoneNumero)){
            return {
                validationOK: false,
                title: "Ops... alguma coisa está errada!",
                text: "Número do telefone precisa ser apenas números!",
                action: "close",
                actionLabel: "Retornar e Resolver",
                innerContextAction: true,
                tptTypeMsg: "error"
            }
        }
        //Validação de WhatsappDDI
        if (isNaN(userWhatsDDI)){
            return {
                validationOK: false,
                title: "Ops... alguma coisa está errada!",
                text: "DDI do whatsapp precisa ser apenas números!",
                action: "close",
                actionLabel: "Retornar e Resolver",
                innerContextAction: true,
                tptTypeMsg: "error"
            }
        }
        //Validação de WhatsDDD
        if (isNaN(userWhatsDDD)){
            return {
                validationOK: false,
                title: "Ops... alguma coisa está errada!",
                text: "DDD do whatsapp precisa ser apenas números!",
                action: "close",
                actionLabel: "Retornar e Resolver",
                innerContextAction: true,
                tptTypeMsg: "error"
            }
        }
        //Validação de WhatsNumero
        if (isNaN(userWhatsNumero)){
            return {
                validationOK: false,
                title: "Ops... alguma coisa está errada!",
                text: "Número do whatsapp precisa ser apenas números!",
                action: "close",
                actionLabel: "Retornar e Resolver",
                innerContextAction: true,
                tptTypeMsg: "error"
            }
        }

        return {
            validationOK: true,
            msgError: ""
        }
    }

    function showFloatMsg(msgData){
        setVisible(true);
        setMsgTitle(msgData.title);
        setMsgText(msgData.text);
        setAction(msgData.action);
        setMsgActionLabel(msgData.actionLabel);
        setInnerContextAction(msgData.innerContextAction);
        setTptTypeMsg(msgData.tptTypeMsg);
    }

    async function startProcessInsert(e){
        e.preventDefault();

        try {
            //Verifica se já existe usuário com o e-mail informado
            const resolve = await axiosApi.get(`/getuserlogin/${userEmail}`)

            if (resolve.status === 200) {
                const resolveData = resolve.data;
                console.log("retorno do backend:", resolveData);
                console.log("retorno do backend:", resolveData.length);

                if (resolveData.length == 0){   //Inicia o processamento de inclusão, se for usuário (email) novo
                    const validationStatus = submitValidations();
                    if (validationStatus.validationOK == false){
                        showFloatMsg(validationStatus);
                        return
                    }

                    setSpinningVisible(1);

                    if (fileAvatar != null){
                        const returnAvatarSent = await sendAvatarToFirebase();
                    }else{
                        await insertUser(avatarSelectionUrl);
                    }
                }else{  //Apresenta erro, caso o usuário já exista
                    showFloatMsg(
                        {
                            validationOK: false,
                            title: "Ops... alguma coisa está errada!",
                            text: "Já existe usuário para o e-mail informado.",
                            action: "close",
                            actionLabel: "Retornar e Resolver",
                            innerContextAction: true,
                            tptTypeMsg: "error"
                        }
                    )
                }
            }else{
                throw "Erro no processamento de verificação de usuário e de criação de novo."
            }
        }catch(err){
            console.log(err);
        }
    }

    async function insertUser(avatarFireBase){
        console.log("iniciando processo de inclusão");

        const salt = gerarSalt();
        const cryptoPassword = gerarHash(userSenha,salt)

        const dataInsert = {
            profile:userProfile,
            role:6,
            id: salt,
            ismaster:userIsMaster,
            apartamento:userApto,
            apartamentoComp:userAptoComp,
            hash:cryptoPassword.hash,
            salt:cryptoPassword.salt,
            inicialPassword:1,
            avatarUrl:avatarFireBase,
            nomecompleto:userNomeCompleto,
            foneddi:userFoneDDI,
            foneddd:userFoneDDD,
            fonenumero:userFoneNumero,
            whatsddi:userWhatsDDI,
            whatsddd:userWhatsDDD,
            whatsnumero:userWhatsNumero,
            email:userEmail,
            pets:userTemPet,
            veiculo:userTemVeic
        }

        setAvatarSelectionUrl(avatarFireBase);
        console.log(dataInsert);

        //Iserção no banco de dados
        try {
            const resolve = await axiosApi.post("/insertnewuser", dataInsert);
            if (resolve.status===200){
                setSpinningVisible(0);
                console.log("retorno da execução:", resolve);
                console.log("dados do retorno da execução:", resolve.data);
                const msgData = {
                    title : "Usuário criado com sucesso!",
                    text : "O acesso do usuário se dará através do e-mail e da senha inicial que você cadastrou. Ao acessar pela primeira vez, será solicitada alteração.",
                    action : "gopannel",
                    actionLabel: "Retornar ao painel principal",
                    innerContextAction: false,
                    tptTypeMsg: "success"
                }
                showFloatMsg(msgData);
            }else{
                throw "Erro ao cadastrar usuário.";
            }
        }catch(err){
            console.log(err);
        }
        
    }

    return(
        <div className="home-container">
            <Spinning visible={spinningVisible} />
            <FloatMsgBox />
            <section className="section-appheader">
                <AppHeader />
            </section>
            <div className="section-painel2 content-newuser">
                <h2>Inclusão de novo usuário</h2>
                <hr></hr>
                <section className="section-div-avatar">
                    <div className="new-user-avatar" style={{backgroundImage: `url(${avatarSelectionUrl})`}}>
                        <input type="file" id="files" name="files" accept="image/png, image/jpeg, image/gif, image/svg" onChange={(e)=>setFileAvatar(e.target.files?.[0])}/>
                    </div>
                    <FaCameraRetro size={24} className='avatar-icon-foto'/>
                </section>
                <div className="new-user-form">
                    <form onSubmit={startProcessInsert}>
                    {/* <form onSubmit={insertUser}> */}
                        <div className="div-form-fields">  
                            <p>Apartamento:</p>
                                <select name="listAptos" name="listaAptos" id="listaAptos" required onChange={(e)=>setUserApto(e.target.value)}>
                                    {
                                        aptosList.map(e=>(
                                            <option key={e.id} value={e.aptoDesc}>{e.aptoDesc}</option>
                                        ))
                                    }
                                </select>
                            <p>Complemento:</p>
                            <select onChange={(e)=>setUserAptoComp(e.target.value)}>
                                {
                                    aptosCompList.map(e=>(
                                        <option key={e.id} value={e.id}>{e.aptocompdesc}</option>
                                    ))
                                }
                            </select>
                            <p>Perfil</p>
                            <select required onChange={(e)=>setUserProfile(e.target.value)}>
                                {
                                    usersProfilesList.map(e=>(
                                        <option key={e.id} value={e.id}>{e.descProfile}</option>
                                    ))
                                }   
                            </select>
                            <p></p>
                            <div className='div-form-radio-check'>
                                <label className='labelCheck'>
                                    <input type="checkbox" id="chkIsMaster" onClick={(e)=>setUserIsMaster(e.target.value=="on")}/>
                                    <p>É usuário master</p>
                                </label>
                            </div>
                            <p>Nome Completo:</p>
                            <input required type="text" value={userNomeCompleto} onChange={(e)=>setUserNomeCompleto(e.target.value)} />
                            <p>Fone DDI:</p>
                            <input type="text"required maxLength="3" placeholder="55" value={userFoneDDI} onChange={(e)=>setUserFoneDDI(e.target.value)}/>
                            <p>Fone DDD:</p>
                            <input required type="text" maxLength="2" onChange={(e)=>setUserFoneDDD(e.target.value)} />
                            <p>Fone Número:</p>
                            <input required type="text" maxLength="9" onChange={(e)=>setUserFoneNumero(e.target.value)} />
                            <p></p>
                            <div className='div-form-radio-check'>
                                <label className='labelCheck'>
                                    <input type="checkbox" id="chkFoneIsZap" onClick={(e)=>placeFoneToZap(e.target)}/>
                                    <p>Telefone é Whatsapp</p>
                                </label>
                            </div>
                            <p>Whatsapp DDI:</p>
                            <input type="text" required placeholder="55" value={userWhatsDDI} onChange={e=>setUserWhatsDDI(e.target.value)}/>
                            <p>Whatsapp DDD:</p>
                            <input type="text" required maxLength="2" value={userWhatsDDD} onChange={e=>setUserWhatsDDD(e.target.value)} />
                            <p>Whatsapp Número:</p>
                            <input type="text" required maxLength="9" value={userWhatsNumero} onChange={e=>setUserWhatsNumero(e.target.value)} />
                            <p>Email:</p>
                            <input required type="email" onChange={(e)=>setUserEmail(e.target.value)} />
                            <p>Possui Pets:</p>
                            <div className='div-form-radio-check'>
                                <label className='labelYesNo'>
                                    <input type="radio" name="radPets" value="1" onClick={(e)=>setUsertemPet(1)}/><p>Sim</p>
                                </label>
                                <label className='labelYesNo'>
                                    <input type="radio" name="radPets" value="0" onClick={(e)=>setUsertemPet(0)}/><p>Não</p>
                                </label>
                            </div>
                            <p>Possui Veículo:</p> 
                            <div className='div-form-radio-check'>
                                <label className='labelYesNo'>
                                    <input type="radio" name="radVeiculos" value="1" onClick={(e)=>setUsertemVeic(1)}/><p>Sim</p>
                                </label>
                                <label className="labelYesNo">
                                    <input type="radio" name="radVeiculos" value="0" onClick={(e)=>setUsertemPet(0)}/><p>Não</p>
                                </label>
                            </div>
                            <p>Senha Inicial:</p>
                            <label className='passwordContainer'>
                                <input required type={typeInputPassword} onChange={(e)=>setUserSenha(e.target.value)}/>
                                {
                                    hidePassword == 1 ? (
                                        <FaEyeSlash size={24} className='iconEye' onClick={()=>toggleHidePassword()}/>
                                    )
                                    :
                                    (
                                        <FaEye size={24} className='iconEye' onClick={()=>toggleHidePassword()}/>
                                    )
                                }
                            </label>
                            <p>Confirmação Senha:</p>
                            <label className='passwordContainer'>
                                <input required type={typeInputConfirmPassword} onChange={(e)=>setUserSenhaConfirm(e.target.value)} />
                                {
                                    hideConfirmPassword == 1 ? (
                                        <FaEyeSlash size={24} className='iconEye' onClick={()=>toggleHideConfirmPassword()}/>
                                    )
                                    :
                                    (
                                        <FaEye size={24} className='iconEye' onClick={()=>toggleHideConfirmPassword()}/>
                                    )
                                }
                            </label>
                        </div>
                        <div className="div-bar-saveCancel">
                            <input type="submit" className='btnForm btnSave' value="Salvar" />
                            <input type="reset" className='btnForm btnReset' value="Limpar" />
                        </div>
                    </form>
                </div>                
            </div>


            <div className="hideElement">
                <AppFooterMenu/>
            </div>

            {/* <div className={`floatMsgBox ${showFloatError==0 && 'floatMsgBoxHidden'}`}>
                <div className="floatMsgBox-content">
                    <h2>Ops, alguma coisa está errada...</h2>
                    <p>{errorDescription}</p>
                    <button onClick={()=>setShowFloatError(0)}>Retornar e Resolver</button>
                </div>
            </div> */}

        </div>
    )
}