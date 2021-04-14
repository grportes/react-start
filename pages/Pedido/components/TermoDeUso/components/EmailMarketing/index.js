import React from 'react';
import PropTypes from 'prop-types';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import useStyles from './styles';
import imgEmail from '../../../../../../../public/images/email_marketing.jpeg'

const Componente = (
    {   exibir,
        razaoSocial,
        onClickAceitaEmail,
        onClickNaoAceitaEmail
    }
) => {

    const classes = useStyles();


    return (
        <>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={exibir}
            >
                <DialogTitle>
                    <img className={classes.imgDialog}
                         src={imgEmail}
                         alt={"Email Arcom"}/>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography style={{marginBottom: '10px'}}>
                            Olá cliente<span className={classes.subTitulo}> {razaoSocial}</span>
                            <br/>
                            Temos muitas novidades e promoções exclusivas para você!
                            <br/>
                            Podemos te avisar por e-mail toda vez que surgir novas oportunidades para o seu negócio?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {onClickNaoAceitaEmail()}} color="primary">
                        Não
                    </Button>
                    <Button  onClick={() => {onClickAceitaEmail()}} color="primary">
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

Componente.propType = {
    exibir: PropTypes.bool.isRequired,
    razaoSocial: PropTypes.string.isRequired,
    onClickAceitaEmail: PropTypes.func.isRequired,
    onClickNaoAceitaEmail: PropTypes.func.isRequired
};

Componente.defaultProps = {
    exibir: false,
    razaoSocial: '',
    onClickAceitaEmail: ()=>{},
    onClickNaoAceitaEmail: ()=>{}
};

export default Componente;