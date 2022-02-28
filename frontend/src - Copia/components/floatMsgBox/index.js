import {useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {msgBoxContext} from './context';
import styles from './index.css'

import {FaExclamation, FaCheckCircle} from 'react-icons/fa'

export default function FloatMsgBox(props){
    const rotas = useHistory();
    const {visible, msgTitle, msgText, innerContextAction, action, msgActionLabel, doAction, tptTypeMsg} = useContext(msgBoxContext);

    function buildContentErrorBoard(templateType){
        var icon;
        var foreColor;
        var btnForeColor;
        var backColor;
        switch (templateType){
            case "error":
                icon = <FaExclamation size={48} color="FF0000" />;
                foreColor="#FF0000";
                btnForeColor="#FFFFFF";
                backColor="#FF0000";
                break;
            case "success":
                icon = <FaCheckCircle size={48} color="#1c3b1d" />;
                foreColor="#64B5F6";
                btnForeColor="#FFFFFF";
                backColor="#1c3b1d";
                break;
        }

        return (
            {
                objBoard: 
                    <div>
                        <div className='floatMsgBox-content-ErrorBoard'>
                            {icon}
                            <p style={{color:`${foreColor}`}}>{msgText}</p>
                        </div>
                    </div>,
                backColor: backColor
            }
        )
    }

    function msgBoxActions(action){
        switch (action){
            case "gopannel":
                rotas.push("/mainpanel");
        }
    }

    return (
        <div className={`floatMsgBox ${visible==false && 'floatMsgBoxHidden'}`}>
            <div className="floatMsgBox-content">
                <h2>{msgTitle}</h2>
                {
                 buildContentErrorBoard(tptTypeMsg).objBoard
                }
                {
                    
                        (innerContextAction ? 
                            <button style={{backgroundColor: `${buildContentErrorBoard(tptTypeMsg).backColor}`}} onClick={()=>doAction(action)}>{msgActionLabel}</button>
                            :
                            <button style={{backgroundColor: `${buildContentErrorBoard(tptTypeMsg).backColor}`}} onClick={()=>msgBoxActions(action)}>{msgActionLabel}</button>
                        ) 

                    
                }
            </div>
        </div>
    )
}