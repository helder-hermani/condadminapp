import {useState, useEffect, useContext} from 'react';
import {framePickAvatarContext} from './context';
import {v4 as uuid} from 'uuid';
import firebase from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage";

import styles from './index.css';

export default function FramePickAvatar(props){
    const userAvatarUrl = props.userAvatarUrl;
    
    const [avatarId, setAvatarId] = useState(""); 
    const {avatarFrameVisible, setAvatarFrameVisible, avatarUrl, setAvatarUrl} = useContext(framePickAvatarContext);

    const [avatarFile, setAvatarFile] = useState();

    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(()=>{
        if (userAvatarUrl==""){
            setAvatarId(uuid().substring(0,10));
            setAvatarUrl("https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png");
        }else{
            setAvatarId(getAvatarId(userAvatarUrl));
            setAvatarUrl(userAvatarUrl);
        }
    },[]);


    function getAvatarId(userAvatarUrl){
        const parts = userAvatarUrl.split("?alt");
        return parts[0].substring(parts[0].length,parts[0].length-11);
    }

    async function uploadFileToFirebase(file, isTemp){
        var urlXXX="";
        const storage = getStorage();

        var storageRef;
        if (isTemp == true){
            storageRef = ref(storage, '/users/avatars/' + avatarId + "-tmp");
        }else{
            storageRef = ref(storage, '/users/avatars/' + avatarId);
        }
        

        const uploadTask = uploadBytesResumable(storageRef, file);

        await uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setLoadingProgress(progress-20);
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
                setLoadingProgress(100);
            }
        );
    }

    async function deleteTempFromFirebase(pickAvatarId){
        const storage = getStorage();

        const firebaseFile = ref(storage, '/users/avatars/' + pickAvatarId + "-tmp")
        
        // Delete the file
        deleteObject(firebaseFile).then(() => {
          console.log("arquivo cancelado");
        }).catch((error) => {
          console.log("erro no cancelamento");
        });
    }

    async function doUpload(pickedFile){
        setLoadingProgress(10);
        setLoadingProgress(0);
        setAvatarFile(pickedFile);
        await uploadFileToFirebase(pickedFile,true);
    }

    async function cancelUpload(avatarId){
        setLoadingProgress(0);

        if (avatarFile != undefined && avatarFile != null){
            await deleteTempFromFirebase(avatarId);
            if (userAvatarUrl == ""){
                setAvatarUrl("https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png");
            }else{
                setAvatarUrl(userAvatarUrl);
            }
            setAvatarFile(null);
        }

        setAvatarFrameVisible(false);
    }

    async function saveUpload(avatarId){
        setLoadingProgress(0);
        if (avatarFile != undefined && avatarFile != null){
            await deleteTempFromFirebase(avatarId);
            await uploadFileToFirebase(avatarFile,false);
        }
        setAvatarFrameVisible(false);
    }

    return(
        <div className={`framepickavatar-main ${!avatarFrameVisible && 'hidden'}`}>
            <div className='framepickavatar-content'>
                <h2>Selecione a Foto para o perfil</h2>
                <div className='avatarPreview' style={{backgroundImage: `url(${avatarUrl})`}}>
                    <input type="file" id="files" name="files" accept="image/png, image/jpeg, image/gif, image/svg" onChange={(e)=>doUpload(e.target.files?.[0])}/>
                </div>
                <div className='progress-container'>
                    <div className='progress-counter' style={{width:`${loadingProgress}%`}}></div>
                </div>
                <div className="div-bar-saveCancel">
                    <input type="submit" className='btnForm btnSave' value="Salvar" onClick={()=>saveUpload(avatarId)} />
                    <input type="reset" className='btnForm btnReset' value="Cancelar" onClick={()=>cancelUpload(avatarId)} />
                </div>
            </div>
        </div>
    )
}