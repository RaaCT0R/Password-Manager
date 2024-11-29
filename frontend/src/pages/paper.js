import React, {Fragment, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useTranslation} from "react-multi-lang";
import Header from "../components/dashHeader";
import Footer from "../components/dashFooter";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import SearchAuthors from "../components/searchAuthors";
import ManageAuthors from "../components/manageAuthors";
import PaperHistory from "../components/paperHistory";
import Box from "@material-ui/core/Box";
import apiClient from "../services/api";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {useSnackbar} from "notistack";
import ButtonAdv from "../components/buttonAdv";

// const user = JSON.parse(sessionStorage.getItem('user'));

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(1),
        minWidth: 300,
    },
    // selectEmpty: {
    //     marginTop: theme.spacing(2),
    // },
    tabs: {

    }
}));

// function createData(partyId, firstName, lastName, email) {
//     return { partyId, firstName, lastName, email };
// }

const PaperPage = (props) => {
    const t = useTranslation()
    const { enqueueSnackbar,closeSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    // const classes = useStyles();
    const paperId = props.location.state.paperId;
    const [paper, setPaper] = React.useState({});
    // console.log("paper:", paper)
    const [value, setValue] = React.useState("1"); //Tab Value
    const [authors, setAuthors] = React.useState([]);
    const [publishers, setPublishers] = React.useState([]);
    const [paperLocalId, setPaperLocalId] = React.useState('');
    const [paperType, setPaperType] = React.useState('');
    const [paperTitle, setPaperTitle] = React.useState('');
    const [paperDesc, setPaperDesc] = React.useState('');
    const [paperKeys, setPaperKeys] = React.useState('');
    const [pubs, setPubs] = React.useState({isReady:false,data:[]});

    useEffect(()=>{
        apiClient.get('api/paper/'+paperId+'?history=true').then((res)=>{
            console.log("get paper",res)
            setPaper({
                title: res.data[0].paper.title,
                localId: res.data[0].paper.localId
            })
            setPaperLocalId(res.data[0].paper.localId)
            setPaperType(res.data[0].paper.type)
            setPaperTitle(res.data[0].paper.title)
            setPaperDesc(res.data[0].paper.description)
            setPaperKeys(res.data[0].paper.keywords)
            setAuthors(res.data[0].authors)
            setPublishers(res.data[0].publisher)
            // setLoadFlag(true)
            // setRows(res.data.slice(0,5))
        }).catch((err)=>{
            console.log("get paper error",err)
            // setLoadFlag(true)
        })
        apiClient.get('api/party/journal' ).then((res)=>{
            setPubs({
                isReady: true,
                data: res.data.map(item=>{
                    return {
                        value: item.partyId,
                        label: item.name
                    }
                })
            })
        }).catch((err)=>{
            console.warn("journal err..",err)
        })
    },[])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addAuthors = (newAuthors) => {
        newAuthors.map( r => {
            let pos = authors.map(function(e) { return e.partyId; }).indexOf(r.partyId);
            if(pos<0) authors.push(r)
            return false
        })
        setAuthors(authors)
    }

    const postPaper = ()=> {
        setLoading(true)
        let packet = {
            paper: {
                paperId: paperId,
                title: paperTitle,
                type: paperType,
                description: paperDesc,
                localId: paperLocalId,
                keywords: paperKeys
            }
        }
        console.log('packet:',packet)
        apiClient.put('api/paper', packet)
            .then(res => {
                console.log("response:",res);
                setLoading(false)
                if (res.status === 200) {
                    setPaper({
                        title: paperTitle,
                        localId: paperLocalId
                    })
                    const action = key => (
                        <Fragment>
                            <IconButton color={"inherit"} onClick={() => { closeSnackbar(key) }}>
                                <CloseIcon/>
                            </IconButton>
                        </Fragment>
                    );
                    enqueueSnackbar(t("Dashboard.Paper.SuccessEditPaper"), {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                        autoHideDuration: 6000,
                        action
                    })
                }
            }).catch(error => {
            console.error(error);
            setLoading(false)
        });
    }

    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1 className={"frame-dashboard-title"}>{t('Dashboard.Paper.Title')}</h1>
                <Card>
                    <Card variant={"outlined"} className="m-4 p-3 bg-info-light">
                        <div className="row mb-2">
                            <div className="col-lg-2 col-md-3 col-sm-12">{t("Dashboard.Paper.PaperCode")}:</div>
                            <div className="col font-weight-bold">{paper.localId}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-sm-12">{t("Dashboard.Paper.PaperTitle")}:</div>
                            <div className="col font-weight-bold">{paper.title}</div>
                        </div>
                    </Card>
                    <TabContext value={value}>
                        <Tabs onChange={handleChange}
                              value={value}
                              indicatorColor="primary"
                              textColor="primary"
                              className="border-bottom"
                              aria-label="simple tabs example">
                            <Tab label={t('Dashboard.Paper.History')} value="1" />
                            <Tab label={t('Dashboard.Paper.Info')} value="2" />
                            <Tab label={t('Dashboard.Paper.Authors')} value="3" />
                        </Tabs >
                        <TabPanel value="1">
                            <PaperHistory publisher={publishers} setPublishers={setPublishers} pubs={pubs} paperId={paperId}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <form noValidate autoComplete="off">
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField id="paper-code"
                                                   label={t("Dashboard.Paper.PaperCode")}
                                                   fullWidth variant="outlined"
                                                   value={paperLocalId}
                                                   onChange={e => setPaperLocalId(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="paper-type-label">
                                                {t("Dashboard.Paper.PaperType")}
                                            </InputLabel>
                                            <Select id="paper-type"
                                                    label={t("Dashboard.Paper.PaperType")}
                                                    labelId="paper-type-label"
                                                    autoWidth
                                                    value={paperType}
                                                    onChange={e => setPaperType(e.target.value)}
                                            >
                                                <ListSubheader>{t("Dashboard.Paper.PaperType")}:</ListSubheader>
                                                <MenuItem value="domesticJour">{t("Dashboard.Paper.Types.domesticJour")}</MenuItem>
                                                <MenuItem value="domesticConf">{t("Dashboard.Paper.Types.domesticConf")}</MenuItem>
                                                <MenuItem value="foreignJour">{t("Dashboard.Paper.Types.foreignJour")}</MenuItem>
                                                <MenuItem value="foreignConf">{t("Dashboard.Paper.Types.foreignConf")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="paper-title"
                                                   label={t("Dashboard.Paper.PaperTitle")}
                                                   fullWidth variant="outlined"
                                                   value={paperTitle}
                                                   onChange={e => setPaperTitle(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="paper-desc"
                                                   label={t("Dashboard.Paper.PaperDescription")}
                                                   multiline rows={3} fullWidth
                                                   variant="outlined"
                                                   value={paperDesc}
                                                   onChange={e => setPaperDesc(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <hr/>
                                        <Box className="d-flex flex-row-reverse">
                                            <ButtonAdv type="button" variant="contained" color="primary" className="width-medium" loading={loading.toString()} onClick={postPaper}>
                                                {t("Action.Edit")}
                                            </ButtonAdv>
                                        </Box>
                                    </Grid>

                                </Grid>

                            </form>
                        </TabPanel>

                        <TabPanel value="3">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <ManageAuthors authors={authors} setAuthors={setAuthors}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <SearchAuthors addAuthors={addAuthors}/>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </Card>
            </Container>
            <Footer/>
        </div>
    );
}

export default PaperPage;
