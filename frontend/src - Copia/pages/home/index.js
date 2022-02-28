
import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import styles from './styles.css';

import AppHeader from '../../components/appheader';
import AppFooterMenu from '../../components/appfootermenu';

import {cardsPainel} from '../../innerjson/innerdata.js';

import DashboardLines from '../../components/dashboardlines';

import {FaBan, FaBars, FaCheck, FaClipboard, FaClock, FaEnvelope, FaFlag, FaHeadset, FaSortDown, FaStar, FaStarHalf, FaStopCircle} from 'react-icons/fa';

export default function Home(){
    const myconst = cardsPainel;
    const shortcuts = myconst.filter((e)=>e.isShortCut==true);
    const rotas = useHistory();

    const [showEvaluateFrame, setShowEvaluateFrame]=useState(false);
    const [setRate, setSetRate] = useState(0);
    const [currentRate, setCurrentRate] = useState(0);
    const [isRated, setIsRated]=useState(false);
    
    function clickSetRate(rate, rateStatus, current){
        setSetRate(rate); 
        setIsRated(rateStatus);
        setCurrentRate(current);
    }

    function rateMouseOut(){
        if (!isRated){
            setCurrentRate(0);
        }else{
            setCurrentRate(setRate);
        }
    }

    return(
        <div className="home-container">
                <section className="section-appheader">
                    <AppHeader />
                </section>
                <div className="section-painel2">
                    {/* <p>Atalhos</p> */}
                    <div className="dashboard-title">
                        <FaSortDown size={16} color="#cd7225"/>
                        <p>Atalhos</p>
                    </div>
                    <div className="cards2">
                        <div className="shortcut-list">
                            <div onClick={()=>rotas.push("/mainpanel")} className="div-icon">
                                <FaBars size={18} />
                            </div>
                            <p>Painel</p>
                        </div>

                        {
                            shortcuts.map(x=> (
                                <div className="shortcut-list">
                                    <div key={x.index} onClick={()=>rotas.push(x.route)} className="div-icon">
                                        <img src={x.icon} alt="Icone documentos"/>
                                    </div>
                                    <p>{x.description}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className="home-content">
                        <div className="home-dashboard">
                            <section className="section-avisos">
                                <div className="dashboard-title">
                                    <FaClipboard size={16} color="#cd7225"/>
                                    <p>Fique por dentro</p>
                                </div>
                                <div className="div-dashboard-list">
                                    <div className="div-dahsboard-line" onClick={()=>rotas.push("/vapraavaisox")}>
                                        <DashboardLines title="titulo teste" description="teste de descrição" maxlenght="50" />
                                    </div>
                                    <div className="div-dahsboard-line" onClick={()=>rotas.push("/vapraavaisox")}>
                                        <DashboardLines title="titulo teste" description="teste de descrição" maxlenght="50" />
                                    </div>
                                    <div className="div-dahsboard-line" onClick={()=>rotas.push("/vapraavaisox")}>
                                        <DashboardLines title="titulo teste" description="teste de descrição" maxlenght="50" />
                                    </div>
                                    <div className="div-dahsboard-line" onClick={()=>rotas.push("/vapraavaisox")}>
                                        <DashboardLines title="titulo teste" description="teste de descrição" maxlenght="50" />
                                    </div>
                                    <div className="div-dahsboard-line" onClick={()=>rotas.push("/vapraavaisox")}>
                                        <DashboardLines title="titulo teste" description="teste de descrição" maxlenght="50" />
                                    </div>
                                </div>
                                <p className="btnMais">+ Mais</p>
                            </section>
                            <section className="section-avisos">
                                <div className="dashboard-title">
                                    <FaFlag size={16} color="rgb(241 78 78)"/>
                                    <p>Suas ouvidorias</p>
                                </div>
                                <div className="div-dashboard-list">
                                    <div className="div-dahsboard-line" onClick={()=>rotas.push("/vapraavaisox")}>
                                        <DashboardLines title="titulo teste" description="teste de descrição" maxlenght="50" />
                                    </div>
                                </div>
                                <p className="btnMais">+ Mais</p>
                            </section>
                        </div>
                        <div className="frame-sindico">
                            <section className="section-avisos no-border">
                                <div className="dashboard-title">
                                    <FaHeadset size={16} color="#cd7225"/>
                                    <p>Síndico Responsável</p>
                                </div>
                                <div className="div-sindico-content">
                                    <section className="sindico-content-header">
                                        <div className="sindico-content-header-avatar">
                                            <div className="sindico-avatar"></div>
                                        </div>
                                        <div className="sindico-content-header-info">
                                            <p>Helder Hermani</p>
                                            <div className="sindico-rating-bar">
                                                <p><FaStar size={16} color="rgb(222 233 68)" /></p>
                                                <p><FaStar size={16} color="rgb(222 233 68)" /></p>
                                                <p><FaStar size={16} color="rgb(222 233 68)" /></p>
                                                <p><FaStar size={16} color="rgb(222 233 68)" /></p>
                                                <p><FaStar size={16} color="rgb(225 225 225)" /></p>
                                            </div>
                                            <p className="btnRateSindico" onClick={()=>setShowEvaluateFrame(true)}>
                                                <FaStar size={16} color="rgb(225 225 225)" /> 
                                                <span>Avalie seu Síndico</span>
                                            </p>
                                        </div>
                                    </section>
                                    <section className="sindico-content-contact">
                                        <div className="sindico-content-contact-datas">
                                            <div className="div-email">
                                                <div>
                                                    <FaEnvelope size={16} color="rgba(0,0,0,.5)" />
                                                    <p>Email</p>
                                                </div>
                                                <p>helder_hermani@yahoo.com.br</p>
                                            </div>
                                            <div className="div-email">
                                                <div>
                                                    <FaClock size={16} color="rgba(0,0,0,.5)" />
                                                    <p>Horário de Atendimento</p>
                                                </div>
                                                <p>De segunda a sexta, das 8h30min às 18h.</p>
                                            </div>
                                        </div>
                                        <div className="sindico-sendmail">
                                            <div className="div-btn-sendmail">
                                                <FaEnvelope size={16} color="rgb(255,255,255)" />
                                                <p className="div-btn-sendmail-caption">Envie um email</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>


                <div className="hideElement">
                    <AppFooterMenu/>
                </div>

            <div className={`${"float-evaluation"} ${showEvaluateFrame === false ? "hidden-element" : ""}`}>
                <div className="evaluation-view">
                    <div className="evaluation-top-bar">
                        <FaStarHalf size={32} color="#FFFFFF" />
                    </div>
                    <h2>Deixe sua opinião sobre o síndico</h2>
                    <p>Que nota você daria para o síndico?</p>
                    <div className="sindico-rating-bar">
                        <p onClick={()=>clickSetRate(0, false, 0)}><FaStopCircle size={48} color="rgba(0, 0, 0, .5)" />
                        </p>
                        <p onClick={()=>clickSetRate(1, true, 1)} onMouseOver={()=>setCurrentRate(1)} onMouseLeave={()=>rateMouseOut()}><FaStar size={48} color={`${currentRate >= 1 ? "rgb(222 233 68)" : "rgb(225 225 225)"}`} /></p>
                        <p onClick={()=>clickSetRate(2, true, 2)} onMouseOver={()=>setCurrentRate(2)} onMouseLeave={()=>rateMouseOut()}><FaStar size={48} color={`${currentRate >= 2 ? "rgb(222 233 68)" : "rgb(225 225 225)"}`} /></p>
                        <p onClick={()=>clickSetRate(3, true, 3)} onMouseOver={()=>setCurrentRate(3)} onMouseLeave={()=>rateMouseOut()}><FaStar size={48} color={`${currentRate >= 3 ? "rgb(222 233 68)" : "rgb(225 225 225)"}`} /></p>
                        <p onClick={()=>clickSetRate(4, true, 4)} onMouseOver={()=>setCurrentRate(4)} onMouseLeave={()=>rateMouseOut()}><FaStar size={48} color={`${currentRate >= 4 ? "rgb(222 233 68)" : "rgb(225 225 225)"}`} /></p>
                        <p onClick={()=>clickSetRate(5, true, 5)} onMouseOver={()=>setCurrentRate(5)} onMouseLeave={()=>rateMouseOut()}><FaStar size={48} color={`${currentRate >= 5 ? "rgb(222 233 68)" : "rgb(225 225 225)"}`} /></p>
                    </div>
                    <p>Deixe seu comentário:</p>
                    <div contentEditable="true" className="evaluation-comment"></div>
                    <div className="div-evaluation-buttons">
                        <div className="btn-evaluation">
                            <div className="div-btn-sendmail">
                                <FaCheck size={16} color="rgb(255,255,255)" />
                                <p className="div-btn-sendmail-caption">Salvar</p>
                            </div>
                        </div>
                        <div className="btn-evaluation">
                            <div className="div-btn-sendmail btn-black" onClick={()=>setShowEvaluateFrame(false)}>
                                <FaBan size={16} color="rgb(255,255,255)" />
                                <p className="div-btn-sendmail-caption">Cancelar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}