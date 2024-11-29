import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Copyright from "./copyright";
import {makeStyles} from "@material-ui/core/styles";
import Background from "../images/signInSide.jpg";
import Logo from "../images/logo.jpg";
import {useTranslation} from "react-multi-lang";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";



export default function SignInSideFrame (props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const t = useTranslation()
    const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
            // display: "flex",
            // flexDirection: "row"
        },
        image: {
            backgroundImage: "url(" + Background + ")",
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'right',
        },
        paper: {
            padding: theme.spacing(4, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '350px',
            height: '100vh',
            overflowY: "scroll"
        },
        footer: {
            // position: "absolute",
            // bottom: "0",
            flexGrow: 1,
            paddingTop: theme.spacing(4),
            display: 'flex',
            // alignContent: "flex-end"
        },
        picture:{
            height: "100%",
            flexGrow: 1,
            backgroundImage: "url(" + Background + ")",
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
        },
        panel:{
            width: matches ? "350px" : "100%",
            height: "100%",
            textAlign: "-webkit-center",
        }
    }));
    const classes = useStyles();
    const {title} = props;
    return(
        <Box component="main" className={classes.root} display="flex">
            <Box className={classes.picture} display={{ xs: 'none', sm: 'block' }}/>
            <Box className={classes.panel} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src={Logo} width="60px"/>
                    <Typography component="h1" variant="h6" className="mt-3">
                        {t("Home.Title")}
                    </Typography>
                    <Typography component="h1" variant="h6" className="mt-3 mb-4">
                        {title}
                    </Typography>

                    {props.children}

                    <div className={classes.footer}>
                        <Copyright />
                    </div>
                </div>
            </Box>
        </Box>
        // <Grid container component="main" className={classes.root}>
        //     <CssBaseline />
        //     <Grid item xs={false} sm={4} md={7} className={classes.image} />
        //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        //         <div className={classes.paper}>
        //             <img src={Logo} width="60px"/>
        //             <Typography component="h1" variant="h5" className="mt-3">
        //                 {t("Home.Title")}
        //             </Typography>
        //             <Typography component="h1" variant="h6" className="mt-3 mb-4">
        //                 {title}
        //             </Typography>
        //
        //             {props.children}
        //
        //             <div className={classes.footer}>
        //                 <Copyright />
        //             </div>
        //         </div>
        //     </Grid>
        // </Grid>
    );
}
