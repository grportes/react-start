import React from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Badge from '@material-ui/core/Badge';

import useStyles from './styles';
import Toolbar from 'Components/CustomToolbar';
import Icone from 'Icons/CustomIconCarrinhoCompra';
import Contexto from 'Contexts/carrinho';
import MenuLateral from './MenuLateral';
import PesquisaMercadoria from './PesquisaMercadoria';
import FiltraCategorias from './FiltraCategoriaMercadoria';

const Componente = ({onLogoutSuccess}) => {

    const {pedido} = useContext(Contexto);
    const [exibirMenu, setExibirMenu] = useState(false);
    const classes = useStyles();
    const qtdProdutosLista = pedido.qtdItens || 0;

    return (
        <Toolbar
            onClickMenu={() => setExibirMenu(true)}
            categorias={<FiltraCategorias/>}
        >
            <MenuLateral
                exibirMenu={exibirMenu}
                onFecharMenu={() => setExibirMenu(false)}
                onLogout={onLogoutSuccess}
            />

            <PesquisaMercadoria/>

            <div className={classes.barButtons}>

                <IconButton
                    className={classes.iconeMinhaConta}
                    component={Link}
                    to='/minha-conta'
                >
                    <AccountCircleOutlinedIcon/>
                </IconButton>

                {
                    qtdProdutosLista > -1 &&
                    (
                        <IconButton
                            aria-label='Fechar pedido'
                            color='inherit'
                            component={Link}
                            to='/finaliza-pedido'
                        >
                            <Badge
                                badgeContent={qtdProdutosLista}
                                color='secondary'
                            >
                                <Icone/>
                            </Badge>
                        </IconButton>
                    )
                }
            </div>

        </Toolbar>
    )
};

Componente.propType = {
    onLogoutSuccess: PropTypes.func
};

Componente.defaultProps = {
    onLogoutSuccess: () => {}
};


export default Componente;