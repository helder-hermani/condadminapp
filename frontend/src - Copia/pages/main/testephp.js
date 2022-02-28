import {useState, useEffect} from 'react';
import {axiosApi} from '../../services/axiosphp';

export default function Testephp(){
    const [retornoGET, setRetornoGET] = useState();
    const [retornoPOST, setRetornoPOST] = useState();

    const [dataPOST, setDataPOST] = useState({
        route: "Helder",
        method: "request and response ok"
    })

    useEffect(async function getPhp(){
        const resolve = await axiosApi.get("/admcondominios/");
        setRetornoGET(resolve.data);
        console.log(resolve.data);
        console.log(retornoGET);
    },[])

    async function sendPostToAPI(){
        const resolve = await axiosApi.post("/admcondominios/",dataPOST);
        setRetornoPOST(resolve.data);
        console.log(resolve);
    }


    return(
        <div>
            <p>teste de conexao com php</p>
            <hr />
            <button onClick={()=>sendPostToAPI()}>Enviar BODY para API</button>
            <hr />
            {
                (retornoPOST != null) &&

                    retornoPOST.map((e)=>
                        (
                            <div>
                                <p>{e.nomecompleto}</p>
                                <p>{e.email}</p>
                            </div>
                        )
                    )

                    // (
                    //     <div>
                    //         <p>{retornoPOST[0].nomecompleto}</p>
                    //         <p>{retornoPOST[0].email}</p>
                    //     </div>
                    // )
                // (retornoGET != undefined) &&
                //     (
                //         <div>
                //             <p>{retornoGET.name}</p>                    
                //             <p>{retornoGET.method}</p>
                //         </div>
                //     )
            }
            
        </div>
    )
}