import React from 'react';
import {useRef} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Form from 'Components/CustomForm';

const Componente = ({
    exibir,
    onClickOk,
    onClickCancel
}) => {
    const iptNome = useRef(null);
    const iptTelefone = useRef(null);
    return (
        <Dialog
            open={exibir}
            onClose={onClickCancel}
        >
            <Form onSubmit={value => onClickOk(value)}>
                <DialogTitle>Confirmação</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor nos informe o seu nome e telefone atualizado, se necessário entraremos em contato para confirmar as informações do pedido.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        inputRef={iptNome}
                        name='nome'
                        label='Nome'
                        type='text'
                        fullWidth
                        required
                    />
                    <br/><br/>
                    <TextField
                        margin='dense'
                        label='Telefone'
                        placeholder='(11) 99999 8765'
                        inputRef={iptTelefone}
                        name='telefone'
                        type='text'
                        fullWidth
                        inputProps={{
                            maxLength: 15,
                        }}
                        required
                    />
                    <br/><br/>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClickCancel}
                        color='primary'
                    >
                        Cancelar
                    </Button>
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Form>
        </Dialog>
    ) ;
};

Componente.propType = {
    exibir: PropTypes.bool.isRequired,
    onClickOk: PropTypes.func.isRequired,
    onClickCancel: PropTypes.func.isRequired
};

Componente.defaultProps = {
    exibir: false,
    onClickOk: ()=>{},
    onClickCancel: ()=>{}
};

export default Componente;