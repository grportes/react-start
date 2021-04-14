import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useRef} from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import BackgroundSedeArcom from '../BackgroundSedeArcom';
import Form from 'Components/CustomForm';
import {Api} from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import trim from 'Util/String/trim';
import isValid from 'Util/isValid';

const service = Api.Seguranca;

const Componente = ({
    idUsuario,
    keyTrocaAcesso,
    onExit
}) => {

    const {setLoading} = useContext(LoadingContext);
    const {msgErro, msgAviso, msgSucesso} = useContext(MessageContext);

    useEffect(_ => {
        setLoading(true);
        service.checkKeyTrocaSenha({idUsuario, key: keyTrocaAcesso})
            .then(response => {
                if (isValid(response)) {
                    setarFoco()
                } else {
                    msgAviso('Solicitação expirada! Tente novamente');
                    onExit();
                }
            })
            .catch(err => msgErro(err))
            .finally(() => setLoading(false));
    },[idUsuario]);

    const [senha, setSenha] = useState({texto1: '',texto2: ''});
    const frmRef = useRef(null);

    const setarFoco = () =>
        frmRef && frmRef.current && frmRef.current.getElementsByTagName('input')[0].focus();

    const changeInputValue = ({target}) => {
        const {name, value} = target;
        setSenha({...senha, [name]: value});
    };

    return (
        <BackgroundSedeArcom>
            <Form
                formRef={frmRef}
                autoComplete='off'
                onSubmit={senha=> {
                    if (trim(senha.texto1) !== trim(senha.texto2)) {
                        msgAviso('Senhas devem ser iguais!!');
                        setarFoco();
                        return
                    }
                    setLoading(true);
                    service.alterarSenha({idUsuario, key: keyTrocaAcesso, senha: trim(senha.texto1)})
                        .then(response => {
                            if (isValid(response))
                                msgSucesso('Senha alterada !! Redirecionado para login!!');
                            else
                                msgAviso('Solicitação expirada! Tente novamente');
                            onExit();
                        })
                        .catch(err => msgErro(err))
                        .finally(() => setLoading(false));
                }}
            >
                <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='stretch'
                    spacing={5}
                >
                    <Grid item>
                        <TextField
                            label='Nova Senha:'
                            name='texto1'
                            value={senha['texto1']}
                            onChange={changeInputValue}
                            type='password'
                            autoComplete='off'
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label='Confirmar Nova Senha:'
                            name='texto2'
                            value={senha['texto2']}
                            onChange={changeInputValue}
                            type='password'
                            autoComplete='off'
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                        >
                            Confirmar
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </BackgroundSedeArcom>
    );
};

Componente.propType = {
    idUsuario: PropTypes.number,
    keyTrocaAcesso: PropTypes.string,
    onExit: PropTypes.func
};

Componente.defaultProps = {
    idUsuario: null,
    keyTrocaAcesso: null,
    onExit: () => {}
};

export default Componente;