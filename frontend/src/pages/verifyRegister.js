import React, {useEffect} from 'react';
import SignInFrame from "../components/signInSideFrame";
import apiClient, {BASE_URL} from "../services/api";
import {useParams,matchPath,useLocation} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-multi-lang";

export default function VerifyRegister(props) {
    const t = useTranslation()
    const location=useLocation();
    const userId = location.pathname.split("/")[3];
    const [waiting, setWaiting] = React.useState(true);

    useEffect(() => {
        apiClient.get('/api/email/verify?userId='+userId)
            .then(res=>{
                setWaiting(false)
            }).catch(err=>{
            console.log("Email verification error",err)
        });
    }, [userId]);

    return(
        <SignInFrame title={""}>
            {waiting?
                <Box p={5}>
                    <CircularProgress/>
                </Box>:
                <Alert severity="success" icon={false} classes={{message:"w-100"}}>
                    <Box p={4}>
                        <Box>
                            <Typography align={"center"} style={{color:"#aedeae"}}>
                                <CheckCircleOutlineIcon style={{ fontSize: 80 }}/>
                            </Typography>
                        </Box>
                        <Box m={4}>
                            <Typography align={"center"} variant={"body1"}>{t("SignUp.SuccessVerifyText")}</Typography>
                        </Box>
                        <Box>
                            <Typography align={"center"}><Button href={"/login"} variant={"outlined"} color={"inherit"}>{t("Login.Title")}</Button></Typography>
                        </Box>
                    </Box>
                </Alert>
            }
        </SignInFrame>
    )
}
