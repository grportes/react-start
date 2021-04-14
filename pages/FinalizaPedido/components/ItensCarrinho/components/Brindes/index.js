import React from 'react';
import {useContext} from 'react';
import Divider from '@material-ui/core/Divider';

import CarrinhoContexto from 'Contexts/carrinho';
import size from 'Util/size';
import useStyles from './styles';
import BrindeAtivo from './components/BrindeAtivo';
import BrindesSecundarios from './components/BrindesSecundarios';

export default () => {
    const {pedido} = useContext(CarrinhoContexto);
    const brindes = pedido.brindes || [];
    const qtPromocoes = size(brindes);
    const classes = useStyles();
    return qtPromocoes === 0
        ?   <></>
        :   <>
            {
                brindes.map(brinde => (
                    <div
                        key={brinde.idPromocao}
                        className={classes.container}
                    >
                        <BrindeAtivo
                            item={brinde.itens.find(item => item.envio)}
                            dataEncerramento={brinde.dataEncerramento}
                        />
                        {
                            size(brinde.itens) > 1 &&
                            <BrindesSecundarios
                                idPromocao={brinde.idPromocao}
                                itens={brinde.itens}
                            />
                        }
                        { qtPromocoes > 1 && <Divider className={classes.divider}/> }
                    </div>
                ))
            }
        </>;
};