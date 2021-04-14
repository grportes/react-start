import React from 'react';
import {Grid} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const Componente = () =>
    <div style={{backgroundColor: "#CCEEFF", padding:20, marginTop:20}} >
        <Grid container
              wrap="nowrap"
              direction="row"
              justify="center"
              alignItems="center">
            <Grid item>
                <InfoIcon color="primary"/>
            </Grid>
            <Grid item xs style={{textAlign:"center"}}>
                <Typography variant="body2" style={{marginLeft:20, marginRight:20}}>
                    Dúvidas sobre os produtos ou brindes?
                    <br/><br/>
                    Entre em contato conosco pelos nossos canais de atendimento:<br/>
                    Telefone: <a href='tel:+553432184008' style={{textDecoration: "none",  color: "black"}}>(34) 3218-4008</a><br/>
                    WhatsApp: <a href='https://wa.me/5534984046050' target="_blank" style={{textDecoration: "none", color: "black"}}>(34) 9 8404-6050</a><br/><br/>
                    Segunda a Sexta-feira, das 8h às 17h<br/>Sábado, das 8h às 12h
                </Typography>
            </Grid>
        </Grid>
    </div>
;


export default Componente;