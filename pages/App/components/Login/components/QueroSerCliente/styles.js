import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    '& > :first-child': {
      marginBottom: '30px',
    },
    '& > :nth-child(2)': {
      marginBottom: '20px',
    },
    '& > :nth-child(3)': {
      marginBottom: '20px',
    },
  },
}));
