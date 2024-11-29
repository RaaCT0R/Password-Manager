import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";

import UserMenu from "./userMenu"
import {useTranslation} from "react-multi-lang";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,

    },
    appMenu: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: "0!important"
    },
    toolbar: {
        flexWrap: 'wrap',
        padding: "0"
    },
    toolbarTitle: {
        flexGrow: 1,
        textDecoration: "none!important",
        color: "black",
        '&:hover' :{
            color: "black",
        }
    },
    appMenuToolbar: {
        minHeight: "45px",
        padding: "0"
    },
    appMenuLink: {
        margin: theme.spacing(0, 1.5),
        padding: theme.spacing(1.5, 0),
        color: "cadetblue",
        '&:hover' :{
            color: "black",
            borderBottom:"1px solid cadetblue"
        },
        '&:first-child' :{
            marginStart: "0"
        },
        textDecoration: "none!important"
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const t = useTranslation()
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="inherit" elevation={0} className={classes.appBar}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Link to="/" className={classes.toolbarTitle}>
                            <Typography variant="h6">{t('Header.Company')}</Typography>
                        </Link>
                        <UserMenu {...props} />
                    </Toolbar>
                </Container>
            </AppBar>
            <AppBar position="static" color="inherit" elevation={0} className={classes.appMenu}>
                <Container>
                    <Toolbar className={classes.appMenuToolbar}>
                        <Link variant="button" to="/dashboard" className={classes.appMenuLink}>
                            {t('Dashboard.Main.Title')}
                        </Link>
                        <Link variant="button" color="textPrimary" underline={"none"} to="/dashboard/papersList" className={classes.appMenuLink}>
                            {t('Dashboard.PapersList.Title')}
                        </Link>
                        <Link variant="button" color="textPrimary" underline={"none"} to="/dashboard/newPaper" className={classes.appMenuLink}>
                            {t('Dashboard.Paper.ShortTitleNew')}
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}
