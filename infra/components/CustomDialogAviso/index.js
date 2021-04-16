import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Componente = ({
  open,
  onClickOk,
  titulo,
  children,
}) => (
  <Dialog
    open={open}
    onClose={onClickOk}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    {
      titulo && <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
    }
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {children}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        variant="outlined"
        onClick={onClickOk}
        color="primary"
        autoFocus
      >
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

Componente.propTypes = {
  open: PropTypes.bool,
  onClickOk: PropTypes.func,
  titulo: PropTypes.string,
  children: PropTypes.node,
};

Componente.defaultProps = {
  open: false,
  onClickOk: () => {},
  titulo: null,
  children: undefined,
};

export default Componente;
