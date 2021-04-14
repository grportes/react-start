import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#daefe2',
    borderRadius: '15px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    '& > :first-child': {
      marginBottom: '10px',
    },
    '& > :last-child': {
      marginBottom: '10px',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      '& > :first-child': {
        marginRight: '15px',
      },
    },
  },
  itemFone: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    '& > :first-child': {
      display: 'flex',
      flexDirection: 'row',
      '& > :first-child': {
        marginRight: '15px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  itemEndereco: {
    display: 'flex',
    flexDirection: 'column',
    '& > :first-child': {
      marginBottom: '10px',
    },
    '& > :last-child': {
      display: 'flex',
      flexDirection: 'row',
      '& > :first-child': {
        marginRight: '15px',
      },
      marginBottom: '10px',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      '& > :first-child': {
        display: 'flex',
        flex: '1',
        marginRight: '10px',
      },
    },
  },
  itemBairro: {
    display: 'flex',
    flexDirection: 'column',
    '& > :first-child': {
      marginBottom: '10px',
    },
    '& > :last-child': {
      display: 'flex',
      flexDirection: 'row',
      '& > :first-child': {
        marginRight: '15px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      '& > :first-child': {
        flex: '1',
      },
      '& > :last-child': {
        flex: '2',
        marginLeft: '15px',
      },
    },
  },
  itemBtnAcoesMobile: {
    marginTop: '80px',
  },
  itemBtnAcoes: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    '& > :last-child': {
      width: '40vh',
    },
  },
}));
