import React from 'react';
import Header from '../components/blogHeader';
import Footer from "../components/layoutBlog_footer";
import {useTranslation} from "react-multi-lang";
import {makeStyles} from "@material-ui/core/styles";
// import HeaderImage from "../images/signInSide.jpg";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: "65px"
    },
    titleSection: {
        // backgroundImage: "url(" + HeaderImage + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundColor: "deepskyblue",
        height: "400px",
        '& h1': {
            color: "white",
            margin: "150px 50px 20px 50px"
        },
        '& h2': {
            color: "darkslateblue",
            margin: "0 50px"
        },
        '& a': {
            margin: "20px 50px"
        }
    }
}));

const Home = (props) => {
    const classes = useStyles();
    const t = useTranslation()

    return (
        <div className={classes.pageContainer}>
            <Header  {...props}/>
            <div className={classes.titleSection}>
                <Container>
                    <h1>{t("Home.Title")}</h1>
                    <h2>{t("Home.Subtitle")}</h2>
                    <Button variant="outlined" color="primary" href="/signUp">
                        {t("Home.SignUp")}
                    </Button>
                </Container>
            </div>
            <Container>
                {/*<h1>Home</h1>*/}
                {/*<p>Home page body content</p>*/}
                {/*<Link to="dashboard" underline={"hover"}>دموی داشبورد</Link>*/}
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </Container>
            <Footer/>
        </div>
    );
    // if (props.loggedIn) {
    //     return (
    //         <div>
    //             <Header {...props}/>
    //             {t('home.Title', {co: 'IUST'})}
    //             <div className="list-group" style={{"marginTop": "100px"}}>slm {bookList}</div>
    //         </div>
    //     );
    // }
    // return (
    //     <div>
    //         <Header {...props} />
    //         {t('home.Title', {co: 'IUST'})}
    //         <div className="alert alert-warning" style={{"marginTop": "100px"}}>You are not logged in. {t('About.Title')}</div>
    //     </div>
    // );
};

export default Home;
