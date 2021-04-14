import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    img: {
        width: 80,
    },
    menuitem: {
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    }
}));