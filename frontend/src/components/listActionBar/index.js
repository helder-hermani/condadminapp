import {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'

import {listActionBarContext} from './context';

import styles from './index.css';

import {FaUserPlus, FaEdit, FaTrash, FaLock, FaUnlock} from 'react-icons/fa'

export default function ListActionBar(props){
    const addRoute = props.addRoute;
    const editRoute = props.editRoute;
    const deleteRoute = props.deleteRoute;
    const lockRoute = props.lockRoute;
    const editCallback = props.editCallback;
    const deleteCallback = props.deleteCallback;
    const lockCallback = props.lockCallback;
    const generalData = props.generalData;

    const rotas = useHistory()
    const {hasSelection} = useContext(listActionBarContext);

    function btnClickSelection(action){
        if (hasSelection){

            switch (action){
                case "edit":
                    if (editCallback != ""){
                        localStorage.setItem("userEditData", generalData);
                    }
                    rotas.push(editRoute);
                    break;
                case "delete":
                    if (deleteCallback != ""){
                        localStorage.setItem("userDeleteData", generalData);
                    }
                    rotas.push(deleteRoute);
                    break;
                case "lock":
                    rotas.push(lockRoute);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div className='listActionBar-main-content'>
            <div className='btnBar' onClick={()=>rotas.push(addRoute)}>
                <FaUserPlus size={24} color="rgba(255,255,255,.9)"/>
            </div>
            <div className={`btnBar ${!hasSelection && 'btnBar-disabled'}`} onClick={()=>btnClickSelection("edit")}>
                <FaEdit size={24} color="rgba(255,255,255,.9)"/>
            </div>
            <div className={`btnBar ${!hasSelection && 'btnBar-disabled'}`} onClick={()=>btnClickSelection("delete")}>
                <FaTrash size={24} color="rgba(255,255,255,.9)"/>
            </div>
            <div className={`btnBar ${!hasSelection && 'btnBar-disabled'}`} onClick={()=>btnClickSelection("lock")}>
                <FaLock size={24} color="rgba(255,255,255,.9)"/>
            </div>
        </div>
    )
}