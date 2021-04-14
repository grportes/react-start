import React from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Contexto from 'Contexts/carrinho';
import size from 'Util/size';
import isEmpty from 'Util/isEmpty';
import Titulo from './components/Titulo';
import TabFolder from './components/TabFolder';
import BtnContinuarComprando from './components/BtnContinuarComprando';
import Itens from './components/Itens';
import Brindes from './components/Brindes';

export default () => {

    const {pedido:{brindes}} = useContext(Contexto);
    const [value, setValue] = useState(1);

    return (
        <Paper style={{padding: '15px'}}>
            <Grid
                container
                direction='column'
            >
                <Grid item>
                    <Titulo/>
                </Grid>
                {
                    !isEmpty(brindes) && (
                        <Grid item>
                            <TabFolder
                                value={value}
                                onChange={(ev,newValue) => setValue(newValue)}
                                qtBrindes={size(brindes)}
                            />
                        </Grid>
                    )
                }
                <Grid
                    item
                    container
                    style={{ display: value === 1 ? '': 'none'}}
                >
                    <Itens/>
                </Grid>
                <Grid
                    item
                    style={{ display: value === 2 ? '': 'none'}}
                >
                    <Brindes/>
                </Grid>
                <Grid
                    item
                    style={{
                        display: 'flex',
                        marginTop: '10px'
                    }}
                >
                    <BtnContinuarComprando/>
                </Grid>
            </Grid>
        </Paper>
    );
};