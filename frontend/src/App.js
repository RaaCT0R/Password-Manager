import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import apiClient from './services/api';
import {lighten, ThemeProvider} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import 'bootstrap-v4-rtl/dist/css/bootstrap.css';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.css';

// Import pages:
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Error from './pages/error';
import PaperPage from "./pages/paper";
import NewPaperPage from "./pages/newPaper";
import PapersListPage from './pages/papersList';
import ProfilePage from "./pages/profile";
// Import fonts
import Vazir from './fonts/Vazir-FD-WOL.woff';
// Import translations:
import {setTranslations, setDefaultLanguage, setLanguage} from 'react-multi-lang'
import fa from './langs/fa.json'
import en from './langs/en.json'
import './App.css';
import {enUS, faIR} from "@material-ui/core/locale";
import VerifyRegister from "./pages/verifyRegister";
import {SnackbarProvider} from "notistack";
import {getLanguage} from "react-multi-lang/lib";
import UserProvider from "./components/provider/userProvider";



const fontVazir = {
    fontFamily: 'Vazir',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
    local('Vazir'),
    local('Vazir-Regular'),
    url(${Vazir}) format('woff2')
  `,
    // unicodeRange:
    //     'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};



// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
function RTL(props) {
    return (
        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>
    );
}
setTranslations({fa, en})
setDefaultLanguage('en')

const originTheme = createMuiTheme({});

const App = () => {
    React.useEffect(()=>{
        if(getLanguage()==='fa'){
            document.getElementsByTagName("body")[0].setAttribute("dir","rtl")
        }else{
            document.getElementsByTagName("body")[0].setAttribute("dir","ltr")
        }
    },[])
    const [themeLocale, setThemeLocale] = React.useState(
        getLanguage()==='fa'? faIR : enUS
    )
    const [theme,setTheme] = React.useState(
{
            direction: getLanguage()==='fa'?'rtl':'ltr',
            typography: {
                fontFamily: 'Vazir, Arial',
            },
            overrides: {
                MuiCssBaseline: {
                    '@global': {
                        '@font-face': [fontVazir],
                    },
                },
                MuiTableCell: {
                    root:{
                        textAlign: "start"
                    },
                    head: {
                        fontWeight: 700
                    }
                },
                MuiTableRow: {
                    root:{
                        "&$selected": {
                            backgroundColor: "rgb(231, 243, 253)",
                        },
                        "&$selected:hover": {
                            backgroundColor: "rgb(200, 229, 251)",
                        },
                    }

                }
            },
            'hr': {
                borderWidth: "1px",

            }
        }
    );

    const changeLanguage = (lang)=>{
        if(lang==='fa'){
            setLanguage('fa')
            document.getElementsByTagName("body")[0].setAttribute("dir","rtl")
            setThemeLocale(faIR)
            setTheme(prevState => ({
                ...prevState,
                direction: 'rtl'
            }))
        }else{
            setLanguage('en')
            document.getElementsByTagName("body")[0].setAttribute("dir","lrt")
            setThemeLocale(enUS)
            setTheme(prevState => ({
                ...prevState,
                direction: 'ltr'
            }))
        }
    };
    const [loggedIn, setLoggedIn] = React.useState(
        sessionStorage.getItem('loggedIn') === 'true' || false
    );
    // const [user, setUser] = React.useState({});
    const login = (data) => {
        // console.log("login...")
        // console.log("data:",data)

        // setUser(JSON.stringify(data));
        sessionStorage.setItem('user', JSON.stringify(data));

        // console.log("user:",user)
        // console.log("stored user:",sessionStorage.getItem('user'))

        setLoggedIn(true);
        sessionStorage.setItem('loggedIn', true);
    };
    const logout = () => {
        apiClient.post('/logout').then(response => {
            if (response.status === 204) {
                setLoggedIn(false);
                sessionStorage.setItem('loggedIn', false);
                sessionStorage.removeItem('user');
            }
        })
    };

    const verifyEmail = ()=> {
        console.log("verifying...")
        return <Redirect to='/login' />
    }

    return (
        <Router>
            <ThemeProvider theme={createMuiTheme(theme,themeLocale)}>
                <UserProvider>
                <RTL>
                    <SnackbarProvider maxSnack={3}>

                    {/*<div className="container mt-5 pt-5">*/}
                        <Switch>
                            <Route path='/' exact render={props => (
                                // <Home {...props} loggedIn={loggedIn} logout={logout} changeLanguage={changeLanguage}/>
                                <Redirect to='/login' />
                            )} />
                            <Route path='/login' render={props => (
                                (loggedIn)
                                    ? <Redirect to='/dashboard' />
                                    : <Login {...props} login={login}/>
                            )} />
                            {/*<Route path='/signUp' render={props => (*/}
                            {/*    (loggedIn)*/}
                            {/*        ? <Redirect to='/dashboard' />*/}
                            {/*        : <SignUp {...props} />*/}
                            {/*)} />*/}
                            <Route
                                path="/signUp"
                                render={({ match: { url } }) => (
                                    <>
                                        <Route path={`${url}/`} exact render={(props)=>(
                                            (loggedIn)
                                                ? <Redirect to='/dashboard' />
                                                : <SignUp {...props} />
                                        )}/>
                                        <Route path={`${url}/verify/:userId`} render={(props)=>(
                                            <VerifyRegister/>
                                        )}/>
                                    </>
                                )}
                            />
                            <Route
                                path="/dashboard"
                                render={({ match: { url } }) => (
                                    <>
                                        <Route path={`${url}/`} exact render={(props)=>(
                                            (loggedIn)
                                                ? <Dashboard {...props} loggedIn={loggedIn} logout={logout}/>
                                                : <Redirect to='/login' />
                                        )}/>
                                        <Route path={`${url}/paper`} render={(props)=>(
                                            (loggedIn)
                                                ? <PaperPage {...props} loggedIn={loggedIn} logout={logout}/>
                                                : <Redirect to='/login' />
                                        )}/>
                                        <Route path={`${url}/newPaper`} render={(props)=>(
                                            (loggedIn)
                                                ? <NewPaperPage {...props} loggedIn={loggedIn} logout={logout}/>
                                                : <Redirect to='/login' />
                                        )}/>
                                        <Route path={`${url}/papersList`} render={(props)=>(
                                            (loggedIn)
                                                ? <PapersListPage {...props} loggedIn={loggedIn} logout={logout}/>
                                                : <Redirect to='/login' />
                                        )}/>
                                    </>
                                )}
                            />
                            <Route path='/profile' render={props => (
                                (loggedIn)
                                    ? <ProfilePage {...props} loggedIn={loggedIn} logout={logout}/>
                                    : <Redirect to='/login' />
                            )} />
                            <Route component={Error}/>
                        </Switch>
                    {/*</div>*/}
                    </SnackbarProvider>
                </RTL>
                </UserProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App;
