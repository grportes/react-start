import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import Typography from '@material-ui/core/Typography';

import Contexto from 'Contexts/carrinho';
import formatBR from 'Util/BR/formatBR';

const Componente = ({promocoes}) => {

    const {totalPedido} = useContext(Contexto);
    const [vlrPedidoSemSt, setVlrPedidoSemSt] = useState(0);
    const [vlrInicialPromo, setVlrInicialPromo] = useState(0);
    const [brindePromo, setBrindePromo] = useState('');

    useEffect(() => {
        setVlrInicialPromo(promocoes[0].vlr_inicial);
        setBrindePromo(promocoes[0].brinde)
    }, [promocoes]);

    useEffect(() => {
        setVlrPedidoSemSt(totalPedido.mapex - totalPedido.stMapex);
    }, [totalPedido]);

    return (
        <div style={{backgroundColor: "#ffedcc", padding:20, marginTop:20, display: vlrPedidoSemSt >= vlrInicialPromo ? 'none' : '' }} >
            <Typography variant="body2" style={{marginLeft:20, marginRight:20}}>
                {
                    vlrPedidoSemSt < vlrInicialPromo &&
                        <>
                        Até agora você comprou {formatBR(vlrPedidoSemSt)} de produtos promocionais. Faltam {formatBR(vlrInicialPromo - vlrPedidoSemSt)} para você ganhar um {brindePromo}! Aproveite!
                    </>
                }
            </Typography>
        </div>
    );

};

export default Componente;