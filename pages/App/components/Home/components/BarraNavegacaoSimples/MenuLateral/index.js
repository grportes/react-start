import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';

import TokenRepository from 'Repository/TokenRepository'
import AreaCliente from '../../BarraNavegacao/MenuLateral/components/AreaCliente';


const Componente = ({
    exibirMenu,
    onFecharMenu,
    onLogout
}) => {

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
                <AreaCliente
                    onClickMinhaConta={() => {
                        onFecharMenu();
                        history.push('/minha-conta');
                    }}
                    onClickSair={() => {
                        TokenRepository.clear();
                        onLogout();
                        history.push('/login');
                        onFecharMenu();
                    }}
                    menuCompleto={false}
                />
            </div>
        </Drawer>
    );

};

Componente.propType = {
    exibirMenu: PropTypes.bool,
    onFecharMenu: PropTypes.func,
    onLogout: PropTypes.func
};

Componente.defaultProps = {
    exibirMenu: false,
    onFecharMenu: () => {},
    onLogout: () => {}
};

export default Componente;