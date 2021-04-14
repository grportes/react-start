import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  fullPage: {
    overflow: 'auto',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://compre.arcom.com.br/imagens/produtos/background_trucks.jpg)',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#00000050',
  },
  areaFormulario: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    width: '45vh',
  },
  areaFormularioExtenso: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    width: '140vh',
    height: '90vh',
    [theme.breakpoints.up('sm')]: {
      height: '80vh',
    },
  },
  areaCabecalho: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
  },
  areaCabecalhoExtenso: {
    display: 'flex',
    marginBottom: '10px',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& > :nth-child(2)': {
      margin: '15px',
    },
  },
}));
