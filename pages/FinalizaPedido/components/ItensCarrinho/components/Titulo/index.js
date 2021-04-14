import React from 'react';
import Typography from '@material-ui/core/Typography';
import BtnContinuarComprando from '../BtnContinuarComprando';

export default () =>
    <>
        <div style={{ display: 'flex'}}>
            <Typography variant='h4'  style={{ fontWeight: 100 }}>
                Meus itens
            </Typography>
            <BtnContinuarComprando/>
        </div>
        <hr/>
    </>;
