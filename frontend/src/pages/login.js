import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PageLogo from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../images/signInSide.jpg';
import Copyright from '../components/copyright'
import apiClient from "../services/api";
import Alert from '@material-ui/lab/Alert';
import {useTranslation} from "react-multi-lang";
import SignInFrame from "../components/signInSideFrame";
import ButtonAdv from "../components/buttonAdv";
import {UserContext} from "../components/provider/userProvider";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url(" + Background + ")",
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alerts: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Login(props) {
    const t = useTranslation()
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
// const [user, setUser] = React.useState('');
    const [email, setEmail] = React.useState(
        localStorage.getItem('email')?localStorage.getItem('email') : ""
    );
    const [password, setPassword] = React.useState(
        localStorage.getItem('password')?localStorage.getItem('password') : ""
    );
    const [rememberMe, setRememberMe] = React.useState(false);
    // const [toHome, setToHome] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    const {setUser} = React.useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        setAuthError(false);
        setUnknownError(false);
        apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                apiClient.post('/login', {
                    email: email,
                    password: password
                }).then(response => {
                    setLoading(false)
                    // console.log("response data:",response.data);
                    if (response.status === 200) {
                        setUser(response.data)
                        // console.log("json2:",JSON.stringify(response.data));
                        // props.setUser(JSON.stringify(response.data))
                        if(rememberMe){
                            localStorage.setItem("password",password)
                            localStorage.setItem("email",email)
                        }
                        props.login(response.data);
                        // setToHome(true);
                    }
                }).catch(error => {
                    setLoading(false)
                    if (error.response && error.response.status === 422) {
                        setAuthError(true);
                    } else {
                        setUnknownError(true);
                        console.error(error);
                    }
                });
            });
    }
    // if (toHome === true) {
    //     return (<Redirect to='/dashboard' />)
    // }

    return (
        <SignInFrame title={t("Login.Title")}>
            <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                <input type="hidden" name="username"/>
                <TextField id="email"
                           type="email"
                           name="email"
                           variant="outlined" margin="normal"
                           required fullWidth autoFocus
                           label={t("Login.Email")}
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                />
                <TextField id="password"
                           type="password"
                           name="password"
                           variant="outlined" margin="normal"
                           autoComplete="current-password"
                           required fullWidth
                           label={t("Login.Password")}
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                />
                {/*<FormControlLabel*/}
                {/*    control={<Checkbox value="remember" color="primary" onChange={e => setRememberMe(e.target.checked )} />}*/}
                {/*    label={t("Login.Remember")}*/}
                {/*/>*/}
                <ButtonAdv type="submit" variant="contained" color="primary"
                           fullWidth className={classes.submit}
                           disabled={loading}
                           loading={loading.toString()}
                >
                    {t("Login.LoginButton")}
                </ButtonAdv>
                <Grid container>
                    <Grid item xs>
                        {/*<Link href="#" variant="body2">*/}
                        {/*    {t("Login.ResetPassword")}*/}
                        {/*</Link>*/}
                    </Grid>
                    <Grid item>
                        <Link href="/signUp" variant="body2">
                            {t("Login.SignUp")}
                        </Link>
                    </Grid>
                </Grid>

            </form>

            <Box mt={3} className={classes.alerts}>
                {authError ? <Alert severity="error">{t("Login.AuthError")}</Alert> : null}
                {unknownError ? <Alert severity="error">{t("Login.UnknownError")}</Alert> : null}
            </Box>
        </SignInFrame>
    );
}
