import {useState, createContext} from 'react';

export const msgBoxContext = createContext({});

export function MsgBoxProvider({children}){
    const [visible, setVisible] = useState(false);
    const [msgTitle, setMsgTitle] = useState("");
    const [msgText, setMsgText] = useState("");
    const [innerContextAction, setInnerContextAction] = useState(true);
    const [action, setAction]=useState("");
    const [msgActionLabel, setMsgActionLabel] = useState("");
    const [tptTypeMsg, setTptTypeMsg] = useState("");

    function setVisibility(status){
        status == true ? setVisible(true) : setVisible(false);
    }

    function doAction(action){
        switch (action){
            case "close":
                setVisible(false);
        }
    }

    return(
        <msgBoxContext.Provider value={{
            visible,
            msgTitle,
            msgText,
            innerContextAction,
            action,
            msgActionLabel,
            tptTypeMsg,
            setVisible,
            setMsgTitle,
            setMsgText,
            setInnerContextAction,
            setAction,
            setMsgActionLabel,
            doAction,
            setVisibility,
            setTptTypeMsg
        }}>
            {children}
        </msgBoxContext.Provider>

    )
}