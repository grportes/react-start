import React from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import useStyles from './styles';
import IconeWhatsApp from 'Icons/CustomIconWhatsApp';
import IconeFone from 'Icons/CustomIconFone';
import IconeChat from 'Icons/CustomIconChat';
import ClienteContext from 'Contexts/cliente';
import isEmpty from 'Util/isEmpty';


const Componente = ({onClick}) => {

    const {cliente} = useContext(ClienteContext);
    const classes = useStyles();

    if (isEmpty(cliente)) return <h3>Carregando...</h3>

    const Contato = props => {
        return (
            <Typography>
                <Link
                    href={props.url}
                    onClick={(event) => event.preventDefault()}
                    className={classes.linkContato}
                    color='inherit'
                >
                    {props.titulo} &nbsp;&nbsp; {props.icone}
                </Link>
            </Typography>
        );
    };

    return (
        <Paper style={{padding: '15px'}}>
            <Typography paragraph>
                Olá cliente {cliente.razaoSocial},
            </Typography>
            <Typography paragraph gutterBottom>
                Identificamos que o seu perfil não está liberado para fazer compras online através do nosso
                e-commerce.
            </Typography>
            <Typography paragraph>
                Solicitamos que você entre em contato com o nosso Atendimento para saber mais detalhes:
            </Typography>
            <div className={classes.contatos}>
                <Contato
                    titulo='Telefone: (34) 3218-4008'
                    url='tel:34-3218-4008'
                    icone=<IconeFone/>
                />
                <Contato
                    titulo='WhatsApp: (34) 9 8404-6050'
                    url='https://api.whatsapp.com/send?phone=5534984046050'
                    icone=<IconeWhatsApp/>
                />
                <Contato
                    titulo='Central de Atendimento'
                    url=''
                    icone=<IconeChat/>
                />
            </div>
            <Typography paragraph>Segunda a Sexta-feira, das 8h às 17h Sábado, das 8h às 12h</Typography>
            <Button
                onClick={onClick}
                style={{
                    backgroundColor: '#00a651',
                    color: 'white',
                }}
            >Continuar</Button>
        </Paper>
    );
};


Componente.propType = {
    onClick: PropTypes.func,
};

Componente.defaultProps = {
    onClick: () => {},
};

export default Componente;