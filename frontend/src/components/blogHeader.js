import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Container from "@material-ui/core/Container";
import PropTypes from 'prop-types';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import UserMenu from "./userMenu"
import {getLanguage, useTranslation} from "react-multi-lang";

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
        padding: "0"
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    toolbarMenu: {
        flexGrow:10
    },
    toolbarLang: {
        margin: theme.spacing(1, 3),
    },
    appBarLink: {
        margin: theme.spacing(0, 1.5),
        padding: theme.spacing(0.1, 0),
        color: "cadetblue",
        '&:hover' :{
            color: "black",
            borderBottom:"1px solid black"
        },
        textDecoration: "none!important"
    }
}));


function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function Header(props) {
    const classes = useStyles();
    const t = useTranslation()

    const userLogin = props.loggedIn
        ? <UserMenu  {...props}/>
        : <NavLink to="/login" className={classes.appBarLink}>
            <Button color="primary" variant="outlined">
                {t('Header.Login')}
            </Button>
        </NavLink>

    const handleLang = () => {
        if(getLanguage()==='en'){
            props.changeLanguage('fa')
        }else{
            props.changeLanguage('en')
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
            <AppBar color="inherit" elevation={0} className={classes.appBar}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            {t('Header.Company')}
                        </Typography>
                        <nav className={classes.toolbarMenu}>
                            <Link to="/" className={classes.appBarLink}>
                                {t('Header.Home')}&nbsp;
                            </Link>
                            <Link to="/" disabled className={classes.appBarLink}>
                                {t('Header.Prices')}
                            </Link>
                            {props.loggedIn
                                ? <Link variant="button" color="textPrimary" to="/dashboard" className={classes.appBarLink}>
                                    {t('Header.Dashboard')}
                                  </Link>
                                : null}
                        </nav>
                        <nav className={classes.toolbarLang}>
                            <Link onClick={handleLang} to={"#"} className={classes.appBarLink}>
                                {getLanguage()==='en'?"فا":"En"}
                            </Link>
                        </nav>
                        {userLogin}
                    </Toolbar>
                </Container>
            </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}
