import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

import UserIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ProfileIcon from '@material-ui/icons/PersonOutline';
import PromotionIcon from '@material-ui/icons/LockOpen';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-multi-lang";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    zeroPad: {
        padding: "0",
    },
    username: {
        marginInlineStart: "6px",
        textTransform: "capitalize"
    },
    userMenuIcon: {
        minWidth: "38px"
    }
}));

export default function MenuListComposition(props) {
    const t = useTranslation()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    function username (){
        let user = JSON.parse(sessionStorage.getItem('user'));
        return user.firstName + " " + user.lastName
    }

    return (
        <div className={classes.root}>
            <div>

                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <UserIcon/>
                    <Typography variant={"body1"} className={classes.username}>
                         {username()}
                    </Typography>
                    {/*{console.log(props.user)}*/}
                </Button>
                {/*<IconButton*/}
                {/*    ref={anchorRef}*/}
                {/*    aria-controls={open ? 'menu-list-grow' : undefined}*/}
                {/*    aria-haspopup="true"*/}
                {/*    onClick={handleToggle}*/}
                {/*>*/}
                {/*    <UserIcon/>*/}
                {/*</IconButton>*/}
                <Popper placement={'bottom-end'} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'end top' : 'end top' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.zeroPad}>
                                        <List component="nav" dense={true} aria-label="user menu">
                                            <ListItemLink href="/profile">
                                                <ListItemIcon className={classes.userMenuIcon}>
                                                    <ProfileIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("User.Menu.Profile")} />
                                            </ListItemLink>
                                            <ListItemLink divider={true} href="#">
                                                <ListItemIcon className={classes.userMenuIcon}>
                                                    <PromotionIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("User.Menu.Upgrade")} />
                                            </ListItemLink>
                                            <ListItemLink href="#" onClick={props.logout}>
                                                <ListItemIcon className={classes.userMenuIcon}>
                                                    <LogoutIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("User.Menu.SignOut")} />
                                            </ListItemLink>
                                        </List>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
