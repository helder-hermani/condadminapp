import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Watch } from  'react-loader-spinner'
import styles from './index.css';

export default function Spinning(props){
    const visible = props.visible;
    return (
        <div className={`spinning-container ${visible==0 && 'ishidden'}`}>
            <Watch
                heigth="100"
                width="100"
                color='green'
                ariaLabel='loading'
            />
        </div>
    )
}