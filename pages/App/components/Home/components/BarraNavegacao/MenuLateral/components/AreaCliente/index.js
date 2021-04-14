import React from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';

import useStyles from './styles';
import ClienteContexto from 'Contexts/cliente';
import CarrinhoContexto from 'Contexts/carrinho';
import formatCnpjCpf from 'Util/BR/formatCnpjCpf';

const Componente = ({
    onClickMinhaConta,
    onClickSair,
    onClickComprar,
    onClickFinalizarPedido,
    menuCompleto
}) => {

    const {cliente} = useContext(ClienteContexto);
    const {pedido} = useContext(CarrinhoContexto);
    const classes = useStyles();

    const qtdProdutosLista = pedido ? pedido.qtdItens || 0 : 0;

    const menuItem = {
        ComponenteIcone: qtdProdutosLista > 0 ? <ShoppingCart/> : <StoreIcon/>,
        texto: qtdProdutosLista > 0 ? 'Finalizar Compra' : 'Comprar',
        onClick: qtdProdutosLista > 0 ? onClickFinalizarPedido : onClickComprar
    };

    return (
        <>
            <div className={classes.logoHeader}>
                <img
                    src='https://compre.arcom.com.br/imagens/produtos/logo.png'
                    style={{width: 60, padding: 8}}
                    alt='logo-menu'
                />
                <ListItem
                    button
                    className={classes.menuItemUser}
                    onClick={onClickMinhaConta}>
                    <Typography className={classes.titulo} variant='h6'>
                        {cliente.fantasia !== '' ? cliente.fantasia : cliente.razaoSocial}
                    </Typography>
                    <Typography variant='body2' gutterBottom style={{fontWeight: 300}}>
                        CNPJ: {formatCnpjCpf(cliente.cnpj)}
                    </Typography>
                </ListItem>
                <ButtonGroup>
                    <Button
                        className={classes.botaoLogout}
                        color='secondary'
                        onClick={onClickSair}
                        aria-label='increase'>
                        <ExitToAppIcon fontSize='small' style={{width: '0.8em'}}/>
                        <Typography variant='inherit'>Sair</Typography>
                    </Button>
                </ButtonGroup>
            </div>

            <MenuItem
                className={classes.menuItem}
                onClick={onClickMinhaConta}
            >
                <AccountCircleOutlinedIcon/>
                <Typography
                    variant='inherit'
                    style={{marginLeft: 12}}
                >Minha Conta</Typography>
            </MenuItem>

            {
                menuCompleto &&
                <>
                    <Divider/>
                    <MenuItem
                        className={classes.menuItemColor}
                        onClick={menuItem.onClick}
                    >
                        {menuItem.ComponenteIcone}
                        <Typography
                            variant='inherit'
                            style={{marginLeft: 12}}
                        >{menuItem.texto}</Typography>
                    </MenuItem>
                </>
            }

        </>
    )
};

Componente.propType = {
    onClickMinhaConta: PropTypes.func,
    onClickSair: PropTypes.func,
    onClickComprar: PropTypes.func,
    onClickFinalizarPedido: PropTypes.func,
    menuCompleto: PropTypes.bool
};

Componente.defaultProps = {
    onClickMinhaConta: () => {},
    onClickSair: () => {},
    onClickComprar: () => {},
    onClickFinalizarPedido: () => {},
    menuCompleto: true
};

export default Componente;