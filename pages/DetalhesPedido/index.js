import React from 'react';
import { Link } from 'react-router-dom';

import ListaItens from './components/ListaItens';
import ListaDetalhes from './components/ListaDetalhes';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import useStyles from './styles';

export default (props) => {

    const [detalhePedido, setDetalhePedido] = React.useState(props.location.state || {})

    const classes = useStyles();

    React.useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    return (
        <>
            <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.btnVoltar}
                style={{ textDecoration: 'none', marginLeft: '20px' }}
                component={Link}
                to={{ pathname: '/minha-conta', state: { prevPath: '/detalhes-pedido' } }}
            >
                VOLTAR
            </Button>

            <Grid container direction='row' spacing={3} style={{ margin: '10px' }}>

                <Grid container item xs={12} sm={8} spacing={3} direction='column' >
                    <ListaItens detalhePedido={detalhePedido} />
                </Grid>

                <Grid container item xs={12} sm={4} spacing={3} direction='column' >
                    <ListaDetalhes detalhePedido={detalhePedido} />
                </Grid>
            </Grid>
        </>
    );
};