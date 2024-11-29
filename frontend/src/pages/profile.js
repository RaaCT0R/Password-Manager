import Header from "../components/dashHeader";
import Container from "@material-ui/core/Container";
import Footer from "../components/dashFooter";
import React, {Fragment, useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Tableau from "../images/profileTableau.jpg"
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import {useTranslation} from "react-multi-lang";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {prefixList, genderList, educationDegreeList} from "../components/lexicon";
import {getLanguage} from "react-multi-lang/lib";
import SelectField from "../components/select";
import Button from "@material-ui/core/Button";
import DateField from "../components/datepicker";
import {checkRequired, obj2Timestamp} from "../services/tools";
import PassField from "../components/passwordField";
import apiClient from "../services/api";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FrameDashboard from "../components/frames/frameDashboard";
import InputText from "../components/formControls/inputText";
import InputSelect from "../components/formControls/inputSelect";
import InputDate from "../components/formControls/inputDate";
import InputPassword from "../components/formControls/inputPassword";
import Divider from "@material-ui/core/Divider";
import ButtonPro from "../components/formControls/buttonPro";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        margin: "auto",
        marginTop: -theme.spacing(5),
        marginBottom: theme.spacing(4),
        width: theme.spacing(10),
        height: theme.spacing(10),
        border: "4px solid white"
    },
    tabItem: {
        // alignItems: "start"
    }
}));

const user = JSON.parse(sessionStorage.getItem('user'));

function username (){
    return user.firstName + " " + user.lastName
}




export default function ProfilePage(props) {
    const classes = useStyles();
    const t = useTranslation()
    const [tabValue, setTabValue] = React.useState("edit");

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <FrameDashboard {...props}>
            <TabContext value={tabValue}>
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
                        <Card>
                            <CardMedia
                                className={classes.media}
                                image={Tableau}
                            />
                            <CardContent className="text-center pt-0">
                                <Avatar className={classes.avatar} src="/broken-image.jpg" />
                                <Typography align={"center"}>{username()}</Typography>
                                <Tabs onChange={handleChangeTab}
                                      value={tabValue}
                                      orientation="vertical"
                                      indicatorColor="primary"
                                      textColor="primary"
                                      className="border-bottom border-top mt-3"
                                      aria-label="profile tabs">
                                    <Tab classes={{wrapper: classes.tabItem}} label={t('Profile.Edit')} value="edit" />
                                    <Tab classes={{wrapper: classes.tabItem}} label={t('Profile.ChangePass')} value="pass" />
                                    <Tab classes={{wrapper: classes.tabItem}} label={t('Profile.Upgrade')} value="upgrade" />
                                </Tabs >
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <TabPanel_Edit/>
                            <TabPanel_Pass/>
                            <TabPanel_Upgrade/>
                        </Card>
                    </div>
                </div>
            </TabContext>
        </FrameDashboard>
    )
}


function TabPanel_Edit() {
    const t = useTranslation()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [loading, setLoading] = React.useState(false)
    const [validation, setValidation] = React.useState({})
    const [personForm, setPersonForm] = React.useState({
        prefix: "", gender: "", firstName: "", lastName: "", degree: "", birthDate: null,
    });
    const prefixSelectOptions = prefixList(getLanguage()).map( item=>{
        return {
            value: item,
            label: t("Lexicons.Prefix."+item)
        }
    })
    const genderSelectOptions = genderList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.Gender."+item)
        }
    })
    const degreeSelectOptions = educationDegreeList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.EduDegree."+item)
        }
    })

    useEffect(()=>{
        apiClient.get('api/party/person/'+user.partyId).then(res => {
            setPersonForm(res.data[0])
        }).catch(err => {
            console.error(err);
        });
    },[])

    function putPersonCharacteristic () {
        if(!checkRequired(personForm,["gender","firstName","lastName"],setValidation)){
            enqueueSnackbar(t("Action.RequiredFieldsError"), {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                autoHideDuration: 6000,
            })
            return false
        }
        setLoading(true)
        let packet = {
            person: personForm
        };
        apiClient.put('api/party/person',packet).then(res => {
            setLoading(false)
            enqueueSnackbar(t("Profile.SuccessEditProfile"), {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                autoHideDuration: 6000,
            })
        }).catch(err => {
            setLoading(false)
            enqueueSnackbar(err.toString(), {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                autoHideDuration: 6000,
            })
        });
    }

    return(
        <TabPanel value="edit">
            <Typography className="card-title" component={"h6"}>{t('Profile.Edit')}</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <InputSelect name="prefix"
                                 label={t("User.Prefix")}
                                 options={prefixSelectOptions}
                                 formValues={personForm}
                                 setFormValues={setPersonForm}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputSelect name="gender"
                                 label={t("User.Gender")}
                                 options={genderSelectOptions}
                                 formValues={personForm}
                                 setFormValues={setPersonForm}
                                 required
                                 validation={validation}
                                 setValidation={setValidation}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputText name="firstName"
                               label={t("User.Name")}
                               formValues={personForm}
                               setFormValues={setPersonForm}
                               required
                               validation={validation}
                               setValidation={setValidation}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputText name="lastName"
                               label={t("User.Surname")}
                               formValues={personForm}
                               setFormValues={setPersonForm}
                               required
                               validation={validation}
                               setValidation={setValidation}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputDate name="birthDate"
                               label={t("User.BirthDate")}
                               formValues={personForm}
                               setFormValues={setPersonForm}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputSelect name="degree"
                                 label={t("User.Degree")}
                                 options={degreeSelectOptions}
                                 formValues={personForm}
                                 setFormValues={setPersonForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Box className="d-flex flex-row-reverse">
                        <ButtonPro loading={loading} onClick={putPersonCharacteristic}>{t("Action.Edit")}</ButtonPro>
                    </Box>
                </Grid>
            </Grid>
        </TabPanel>
    )
}

const TabPanel_Pass = ()=> {
    const t = useTranslation()
    // const [oldPass, setOldPass] = React.useState(null);
    // const [newPass, setNewPass] = React.useState(null);
    // const [newPass2, setNewPass2] = React.useState(null);
    // function putPassword() {
    //     let packet = {
    //         partyId: user.partyId,
    //         oldPass: oldPass,
    //         newPass: newPass,
    //         repeatedNewPass: newPass2,
    //     }
    //     console.log('putPassword',packet)
    // }
    return (
        <TabPanel value="pass">
            <Typography className="card-title" component={"h6"}>{t('Profile.ChangePass')}</Typography>
            <Typography variant="caption">Coming soon...</Typography>
        </TabPanel>
    )
}

function TabPanel_Upgrade() {
    const t = useTranslation()
    return (
        <TabPanel value="upgrade">
            <Typography className="card-title" component={"h6"}>{t('Profile.Upgrade')}</Typography>
            <Typography variant="caption">Coming soon...</Typography>
        </TabPanel>
    )
}
