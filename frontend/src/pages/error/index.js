import React from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useEffect,useState} from 'react';

import styles from './index.css';

export default function Error(props){
    const params = useParams();
    const rota = useHistory();
    const [errorTitle, setErrorTitle] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [classImageBackground, setClassImageBackground] = useState("stop.png");

    function buidErrorPage(typeMsg){
        const paramsElements = typeMsg.split("@");
        switch (paramsElements[0]){
            case "forbidden":
                setErrorTitle("Usuário não autorizado!");
                setErrorMsg("Este acesso é exclusivo para usuários autorizados, autenticados com login e senha.");
                setClassImageBackground("backImg-forbidden");
                break;
            case "fail":
                setErrorTitle("Probelmas na sua requisição.");
                setErrorMsg(`Caro ${paramsElements[1]}, a senha informada não é válida. Acesse a opção recuperar senha, ou fale com o administrador.`);
                setClassImageBackground("backImg-fail");
                break;
            case "blocked":
                setErrorTitle("Usuário bloqueado.");
                setErrorMsg(`Caro ${paramsElements[1]}, o seu acesso está bloqueado. Se ainda assim acredita que deveria ter acesso, entre em contato com o usuário de vinculação ou com o administrador do sistema`);
                setClassImageBackground("backImg-forbidden");
                break;
            case "expired":
                setErrorTitle("Usuário não autorizado ou sessão expirada");
                setErrorMsg(`Sua sessão expirou ou seu acesso não está autorizado. Faça login novamente.`);
                setClassImageBackground("backImg-forbidden");
                break;
            default:
                setErrorMsg(typeMsg);
                break;
        }
    }

    useEffect(()=>{
        buidErrorPage(params.typemessage);
    },[]);

    return (
        <div className="div-error-main">
            <div className="error-screen">
                <div className="msg-header">
                    <h1>Ops!</h1>
                </div>
                
                <p className="p-error errorTitle">{errorTitle}</p>
                <div className={`div-image ${classImageBackground}`} />
                <p className="p-error errorMessage">{errorMsg}</p>
                <button className="btn" onClick={()=>rota.push("/")}>Voltar</button>
            </div>
        </div>
    )
}