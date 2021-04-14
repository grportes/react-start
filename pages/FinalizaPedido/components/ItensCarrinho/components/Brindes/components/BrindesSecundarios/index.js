import React from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Context from 'Contexts/carrinho';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from 'Util/isEmpty';
import PropTypes from 'prop-types';

const Componente = ({
    idPromocao,
    itens
}) => {

    if (isEmpty(itens)) return <></>;

    const {trocarBrinde} = useContext(Context);
    const {setLoading} = useContext(LoadingContext);
    const {msgErro, msgAviso} = useContext(MessageContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const brindes = itens.filter(item => !item.envio);
    const idMenu = String(Math.random());

    return (
        <div style={{marginTop: '10px'}}>
            <Button
                aria-controls={idMenu}
                aria-haspopup='true'
                onClick={ev => setAnchorEl(ev.currentTarget)}
                variant='outlined'
            >
                Trocar Brinde
            </Button>
            <Menu
                id={idMenu}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={_ => setAnchorEl(null)}
            >
                {
                    brindes && brindes.map(brinde =>
                        <MenuItem
                            key={brinde.idMercadoria}
                            onClick={() => {
                                setLoading(true);
                                trocarBrinde(idPromocao,brinde.idMercadoria)
                                .catch(e => msgErro(e))
                                .finally(() => {
                                    setAnchorEl(null);
                                    setLoading(false)
                                });
                        }}>
                            {brinde.descricaoCompleta}
                        </MenuItem>
                    )
                }
            </Menu>
        </div>
    );

};

Componente.propType = {
    idPromocao: PropTypes.number,
    itens: PropTypes.array
};

Componente.defaultProps = {
    idPromocao: null,
    itens: []
};

export default Componente;