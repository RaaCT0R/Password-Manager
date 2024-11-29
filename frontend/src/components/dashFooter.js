import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './copyright'

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 'auto',
    },
    footerContainer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
    },

}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <Container component={"footer"} className={classes.footer}>
            <Typography variant={"body2"} className={classes.footerContainer} align="center">
                <Copyright />
            </Typography >
        </Container>
    );
}
