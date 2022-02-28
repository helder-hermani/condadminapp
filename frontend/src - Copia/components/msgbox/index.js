import stylesX from './styles.css';

export default function MsgBox(props){
    return (
        <div className="msgbox-container">
            <p className="btn btnTrue">{props.CaptionTrue}</p>
            <p className="btn btnFalse">{props.CaptionFalse}</p>
        </div>
    )
}