import React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import CarrinhoContext from 'Contexts/carrinho';

import useStyles from './styles';
import formatBR from 'Util/BR/formatBR';
import unidadeMedida from 'Util/unidadeMedida';
import InputQuantidade from '../InputQuantidade';
import FotoMercadoria from 'Components/CustomFotoMercadoria';
import IconePromocao from 'Components/CustomFotoPromocao';

const Componente = ({
    mercadoria,
    itemPromocao
}) => {

    const classes = useStyles();

    const {setOpenImagemDialog, setMercadoriaSelecionada} = useContext(CarrinhoContext);

    return (
        <Paper className={classes.container}>
            <div className={classes.boxImage} 
            onClick={() => {
                setOpenImagemDialog(true);
                setMercadoriaSelecionada(mercadoria);
            }}>
                <FotoMercadoria codigoFoto={mercadoria.codigoFoto} style={{width: 110, marginTop: 12, cursor: "pointer"}} />  
                {
                    itemPromocao && (<div className={classes.boxIcon}><IconePromocao /></div>)
                }
            </div>
            <div className={classes.infoProduto}>
                <div style={{textAlign:'center', marginBottom: 24}}>
                    <Typography className={classes.nomeProduto} variant='h1' gutterBottom>{mercadoria.descricaoCompleta}</Typography>
                    <Typography className={classes.valorProduto} variant='button' gutterBottom>{formatBR(mercadoria.precoVendaSt)}</Typography>
                    <div style={{marginTop: 10}}>
                        <Typography className={classes.valorProdutoUni}>PREÇO UNITÁRIO: {formatBR(mercadoria.precoUnitarioSt)}</Typography>
                        <Typography className={classes.valorProdutoUni}>{unidadeMedida(mercadoria.unidadeVenda)} COM {mercadoria.embLista}</Typography>
                    </div>
                </div>
                <InputQuantidade merc={mercadoria}/>
            </div>
        </Paper>
    );
};

Componente.propType = {
    mercadoria: PropTypes.object,
    itemPromocao: PropTypes.bool
};

Componente.defaultProps = {
    mercadoria: {},
    itemPromocao: false
};

export default Componente