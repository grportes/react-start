import React from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import ClienteContext from 'Contexts/cliente';
import HistoricoPedidos from './components/HistoricoPedidos';
import ClienteCadastro from './components/ClienteCadastro';
import AvisoCliente from './components/AvisoCliente';
import isEmpty from 'Util/isEmpty';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


const Componente = (props) => {

    const {cliente} = useContext(ClienteContext);
    const [value, setValue] = useState(0);
    const [exibirAvisoCliente, setExibirAvisoCliente] = useState(false);

    // Se a última rota for 'detalhes-pedido', define o TAB, ao voltar na rota 'minha-conta', com o valor = 1 ('Meus Pedidos')
    if(props.location.state){
        if(props.location.state.prevPath === "/detalhes-pedido"){
            props.location.state.prevPath = ''
            setValue(1);
        }
    }

    let history = useHistory();

    const tabProps = (label,index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
            label: label
        };
    };

    if (isEmpty(cliente)) return <h3>Carregando...</h3>;

    if (exibirAvisoCliente) return <AvisoCliente onClick={() => setExibirAvisoCliente(false)}/>

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Tabs
                value={value}
                onChange={(ev,nv) => setValue(nv)}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab {...tabProps('Cadastro', 0)} />
                <Tab {...tabProps('Meus Pedidos', 0)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <ClienteCadastro/>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <HistoricoPedidos/>
            </TabPanel>

            <div style={{
                width: 'auto',
                marginLeft: '25px'
            }}>
                <Button
                    variant='outlined'
                    startIcon={<AddShoppingCartIcon/>}
                    onClick={() => {
                        const {acessoLimitado = false} = cliente;
                        if (acessoLimitado)
                            setExibirAvisoCliente(true);
                        else
                            history.push('/pedido');
                    }}
                    style={{
                        backgroundColor: '#00a651',
                        color: 'white',
                    }}
                >
                    Comprar
                </Button>
            </div>
        </div>
    );
};

export default Componente;