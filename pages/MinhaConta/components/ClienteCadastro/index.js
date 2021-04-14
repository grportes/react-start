import React from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import {useRef} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import './styles.css';
import ClienteContext from 'Contexts/cliente';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from 'Util/isEmpty';
import {Api} from 'Services/api';


const segurancaService = Api.Seguranca;

const Componente = () => {

    const {cliente} = useContext(ClienteContext);
    const {setLoading} = useContext(LoadingContext);
    const {msgErro, msgSucesso} = useContext(MessageContext);

    const [dialogSenha, setDialogSenha] = useState(false);
    const [editarSenha, setEditarSenha] = useState({
        showPass: false,
        erroSenhaAtual: false,
        erroNovaSenha: false,
        erroNovaSenha2: false,
        msgErroSenhaAtual: '',
        msgErroNovaSenha: '',
        msgErroNovaSenha2: ''
    });
    const iptSenhaAtual = useRef(null);
    const iptNovaSenha = useRef(null);
    const iptNovaSenha2 = useRef(null);

    const alteraSenha = async () => {

        const senha = iptSenhaAtual.current.value;
        const novaSenha = iptNovaSenha.current.value;
        const novaSenha2 = iptNovaSenha2.current.value;

        if (isEmpty(senha)) {
            setEditarSenha({erroSenhaAtual: true, msgErroSenhaAtual: 'Senha atual obrigatoria!'});
            return;
        }
        setEditarSenha({erroSenhaAtual: false, msgErroSenhaAtual: ''});

        if (isEmpty(novaSenha)) {
            setEditarSenha({erroNovaSenha: true, msgErroNovaSenha: 'Nova senha obrigatoria!'});
            return;
        }
        setEditarSenha({erroNovaSenha: false, msgErroNovaSenha: ''});

        if (isEmpty(novaSenha2)) {
            setEditarSenha({erroNovaSenha2: true, msgErroNovaSenha2: 'Confirmação nova senha obrigatoria!'});
            return;
        }
        setEditarSenha({erroNovaSenha2: false, msgErroNovaSenha2: ''});

        if (novaSenha !== novaSenha2) {
            setEditarSenha({erroNovaSenha2: true, msgErroNovaSenha2: 'Nova senha e confirmação de senha diferentes!'});
            return;
        }
        setEditarSenha({erroNovaSenha2: false, msgErroNovaSenha2: ''});

        try {
            setLoading(true);
            await segurancaService.trocaSenha(senha, novaSenha);
            msgSucesso("Senha alterada!!");
            setDialogSenha(false);
        } catch (e) {
            msgErro(e);
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <Paper
                elevation={1}
                style={{padding: '40px'}}
            >
                <Typography variant="h5" component="h2">
                    {cliente.fantasia}
                </Typography>
                <Typography color="textSecondary">
                    Razão Social: {cliente.razaoSocial}
                    <br/>
                    CNPJ: {cliente.cnpj}
                    <br/>
                    Endereço: {cliente.logradouro + " " + cliente.endereco + ", " + cliente.nroEndereco + " - " + cliente.bairro}
                </Typography>
                <br/>
                <Divider/>
                <br/>
                <Typography variant="body2" component="p">
                    <b>Email:</b> {cliente.email}
                    <br/>
                    <b>Data do último pedido:</b> {cliente.dataUltimoPedido ? new Date(cliente.dataUltimoPedido).toLocaleDateString('pt-BR') : ''}
                    <br/>
                </Typography>
                <br/>
                <Divider/>
                <br/>
                <Button
                    className="minha_conta___btn_mudar_senha"
                    variant="contained"
                    size="small"
                    onClick={() => {
                        setDialogSenha(true)
                    }}
                >
                    Alterar Senha
                </Button>
            </Paper>

            <Dialog
                open={dialogSenha}
                onClose={() => setDialogSenha(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">ALTERAR SENHA</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, informe sua senha atual e a nova senha.
                    </DialogContentText>
                    <div>
                        <InputLabel>Senha Atual</InputLabel>
                        <Input
                            required
                            autoFocus
                            type={editarSenha.showPass ? 'text' : 'password'}
                            margin="dense"
                            inputRef={iptSenhaAtual}
                            error={editarSenha.erroSenhaAtual}
                            placeholder={editarSenha.msgErroSenhaAtual}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                            setEditarSenha({showPass: !editarSenha.showPass})
                                        }}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                        }}
                                    >
                                        {editarSenha.showPass ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <br/>
                        <br/>
                    </div>
                    <div>
                        <TextField
                            required
                            margin="dense"
                            inputRef={iptNovaSenha}
                            label="Nova Senha"
                            type={editarSenha.showPass ? 'text' : 'password'}
                            error={editarSenha.erroNovaSenha}
                            helperText={editarSenha.msgErroNovaSenha}
                            fullWidth/>
                        <br/>
                        <TextField
                            required
                            margin="dense"
                            inputRef={iptNovaSenha2}
                            label="Confirme Nova Senha"
                            type={editarSenha.showPass ? 'text' : 'password'}
                            error={editarSenha.erroNovaSenha2}
                            helperText={editarSenha.msgErroNovaSenha2}
                            fullWidth/>
                    </div>
                    <br/><br/>
                </DialogContent>
                <DialogActions>
                    <Button className="minha_conta___mudar_senha_cancelar" onClick={() => {
                        setDialogSenha(false)
                    }} size="small" color="primary">
                        Cancelar
                    </Button>
                    <Button className="minha_conta___mudar_senha_confirmar" onClick={alteraSenha} size="small"
                            color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
};


export default Componente;