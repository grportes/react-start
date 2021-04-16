import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  fabL: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(2),
  },
  fabR: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(2),
  },
}));
