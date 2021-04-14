import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import InputBase from '@material-ui/core/InputBase';

import './index.css';
import Contexto from 'Contexts/carrinho';
import MsgContexto from 'Contexts/message';

const Componente = (props) => {

    const {itens, adicionaProdutoCarrinho, removeProdutoCarrinho} = useContext(Contexto);
    const {msgAviso} = useContext(MsgContexto);
    const [quantidade, setQuantidade] = useState(0);
    const [hideInput, setHideInput] = useState(false);

    useEffect(() => {
        atualizarQtdeInformadaPeloCliente();
    }, [itens]);

    const atualizarQtdeInformadaPeloCliente = () => {

        // TODO - CRIAR UM METODO NO CONTEXTO QUE RECEBE A MERCADORIA E ENTREGA A QTDE.
        setHideInput(props.hideInput);
        if (itens.has(props.merc.idMercadoria)) {
            let item = itens.get(props.merc.idMercadoria);
            setQuantidade(item.qtdVendida);
        }
    };

    const subtrairQtde = () => {

        if (quantidade === 0) return;
        if (quantidade ===  props.merc.qtdMinimaNoPedido) {
            setQuantidade(0);
            removeProdutoCarrinho(props.merc.idMercadoria);
        } else {
            let qtdVendida = quantidade - props.merc.qtdMinimaNoPedido;
            setQuantidade(qtdVendida);
            adicionaProdutoCarrinho({...props.merc, qtdVendida});
            props.onChange(); // TODO - VER PARA QUE SERVE ????
        }
    };

    const somarQtde = () => {

        let qtdVendida = props.merc.qtdMinimaNoPedido + quantidade;
        if ( props.merc.cotaPedido !== null &&  props.merc.cotaPedido > 0) {
            if (qtdVendida > props.merc.cotaPedido) {
                msgAviso(`Mercadoria limitada a ${props.merc.cotaPedido} por cliente!`);
                return;
            }
        }
        if ( qtdVendida >= 999 ) qtdVendida = quantidade;
        setQuantidade( qtdVendida );
        adicionaProdutoCarrinho( { ...props.merc, qtdVendida } );
        props.onChange(); // TODO - VER PARA QUE SERVE ????
    };

    return (
        <div className='input-qtde'>
            <Button
                variant='outlined'
                onClick={subtrairQtde}>
                <RemoveIcon fontSize='small' />
            </Button>
            {!hideInput && (
                <InputBase
                    type='number'
                    color='primary'
                    className='number-qtd'
                    value={quantidade <= 0 ? 0 : quantidade}
                    inputProps={{
                        style: { textAlign: "center" }
                    }}
                />
            )}
            <Button
                variant='outlined'
                onClick={somarQtde}>
                <AddIcon fontSize="small" />
            </Button>
        </div>
    );

};

Componente.defaultProps = {
    onChange: () => {}
};

export default Componente;