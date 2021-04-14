import React from 'react';
import {useContext} from 'react';
import {useEffect} from 'react';
import {useReducer} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import TokenRepository from 'Repository/TokenRepository'
import Contexto from 'Contexts/carrinho';
import AreaCliente from './components/AreaCliente';
import AreaCategoria from './components/AreaCategoria';
import AreaSubCategoria from './components/AreaSubCategoria';

const initialState = {
    menuPrincipal: false,
    menuSubCategoria: false
};

const Componente = ({
    exibirMenu,
    onFecharMenu,
    onLogout
}) => {

    const {pesquisarMercadoriaPorSubCategoria} = useContext(Contexto);

    const [menu, setMenu] = useReducer((state,action) => {
        switch (action.type) {
            case 'MENU_PRINCIPAL':
                return {...initialState, menuPrincipal: true};
            case 'MENU_SUBCATEGORIA':
                return {...initialState, ...{...action.payload, menuSubCategoria: true}};
        }
        return state;
    },initialState);

    useEffect(() => {
        setMenu({type: 'MENU_PRINCIPAL'});
    },[]);

    let history = useHistory();

    return (
        <Drawer
            open={exibirMenu}
            onClose={event => {
                if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
                onFecharMenu();
            }}
        >
            <div style={{width: '240px'}} >
                {
                    menu.menuPrincipal &&
                    (
                        <>
                            <AreaCliente
                                onClickMinhaConta={_ => {
                                    onFecharMenu();
                                    history.push('/minha-conta');
                                }}
                                onClickSair={_ => {
                                    TokenRepository.clear();
                                    onLogout();
                                    history.push('/login');
                                    onFecharMenu();
                                }}
                                onClickComprar={_ => {
                                    onFecharMenu();
                                    history.push('/pedido');
                                }}
                                onClickFinalizarPedido={_ => {
                                    onFecharMenu();
                                    history.push('/finaliza-pedido');
                                }}
                            />
                            <Divider style={{marginBottom: '24px'}}/>
                            <AreaCategoria
                                onClickCategoria={value => setMenu({
                                    type: 'MENU_SUBCATEGORIA',
                                    payload: {categoria: value}
                                })}
                            />
                        </>
                    )
                }
                {
                    menu.menuSubCategoria &&
                    (
                        <AreaSubCategoria
                            categoria={menu['categoria']}
                            onClickFechar={_ => setMenu({type: 'MENU_PRINCIPAL'})}
                            onClickSubCategoria={subcategoria => {
                                if (history.location !== '/pedido') history.push('/pedido');
                                pesquisarMercadoriaPorSubCategoria(subcategoria);
                                onFecharMenu();
                            }}
                        />
                    )
                }
            </div>
        </Drawer>
    );

};

Componente.propType = {
    exibirMenu: PropTypes.bool,
    onFecharMenu: PropTypes.func
};

Componente.defaultProps = {
    exibirMenu: false,
    onFecharMenu: () => {}
};

export default Componente;