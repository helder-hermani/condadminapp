import {useState, useEffect} from 'react';
import styles from './styles.css';
import {FaCheck} from 'react-icons/fa'

export default function DashboardLines(props){
    const {title, description, maxlenght, priority} = props;
    const [classIconColumn, setClassIconColumn] = useState("");

    const type="important";

    useEffect(()=>{
        if (type=="complain"){
            setClassIconColumn("dash-icon-left-side complain");
        }else if (type=="important"){
            setClassIconColumn("dash-icon-left-side important");
        }else {
            setClassIconColumn("dash-icon-left-side ordinary");
        }
    },[])


    return (
        <div className="dashboard-main-container">
            <div className={classIconColumn}>
                <FaCheck size={16} color="#ffffff" />
            </div>
            <div className="dashboard-content-right-side">
                <div><p>{title}</p></div>
                <div className="div-aviso-from">
                    <p>Por: Helder Hermani</p>
                    <p>Em: 15/01/2021</p>
                </div>
                <div className="div-aviso-sumary">
                    <p>
                        It is a long established fact that a reader will be distracted by the 
                        readable content of a page when looking...
                    </p>
                </div>
            </div>
        </div>
    )
}