import {useState, createContext} from 'react';

export const framePickAvatarContext = createContext({});

export function FramePickAvatarProvider({children}){
    const [avatarFrameVisible, setAvatarFrameVisible] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");

    return(
        <framePickAvatarContext.Provider value={{
            avatarFrameVisible,
            setAvatarFrameVisible,
            avatarUrl,
            setAvatarUrl
        }}>
            {children}
        </framePickAvatarContext.Provider>

    )
}