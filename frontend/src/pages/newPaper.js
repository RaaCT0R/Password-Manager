import React, {Fragment, useEffect} from 'react';
import {useTranslation,getLanguage} from "react-multi-lang";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import SearchAuthors from '../components/searchAuthors'
import ManageAuthors from '../components/manageAuthors'
import Box from "@material-ui/core/Box";
import {paperTypesList, paperStatusList} from '../components/lexicon'
import apiClient from "../services/api";
import ButtonAdv from "../components/buttonAdv";
import {Link} from "react-router-dom";
import { useSnackbar } from 'notistack';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputText from "../components/formControls/inputText";
import InputSelect from "../components/formControls/inputSelect";
import InputDate from "../components/formControls/inputDate";
import FrameDashboard from "../components/frames/frameDashboard";
import {checkRequired} from "../services/tools";

Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 3)) {s = "0" + s;}
    return s;
}

function createAuthor(partyId, firstName, lastName, email) {
    return { partyId, firstName, lastName, email };
}

const PaperPage = (props) => {
    const t = useTranslation()
    const { enqueueSnackbar,closeSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [authors, setAuthors] = React.useState(
        [createAuthor(user.partyId, user.firstName, user.lastName, user.email)]
    );
    const [validation, setValidation] = React.useState({})
    const [paperForm, setPaperForm] = React.useState({paperLocalId:""});
    const [pubs, setPubs] = React.useState({isReady:false,data:[]});

    const statusSelectOptions = paperStatusList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.PaperStatus."+item)
        }
    })
    const typeSelectOptions = paperTypesList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.PaperType."+item)
        }
    })

    useEffect(()=>{
        apiClient.get('api/paper/party' ).then((res)=>{
            const num = res.data.length + 1;
            setPaperForm(prevState => ({...prevState, paperLocalId: "P"+num.pad()}))
        }).catch((err)=>{
            console.warn("get party papers err:",err)
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

    const addAuthors = (newAuthors) => {
        newAuthors.map( r => {
            let pos = authors.map(function(e) { return e.partyId; }).indexOf(r.partyId);
            if(pos<0) authors.push(r)
            return false
        })
        setAuthors(authors)
    }

    const postPaper = ()=> {
        if(!checkRequired(paperForm,["paperLocalId","paperTitle","paperType","paperPublisher","paperStatus","paperDate"],setValidation)){
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
            paper: {
                title: paperForm.paperTitle,
                type: paperForm.paperType,
                description: paperForm.paperDesc,
                localId: paperForm.paperLocalId,
                keywords: paperForm.paperKeywords
            },
            publisher: {
                partyId: paperForm.paperPublisher,
                status: paperForm.paperStatus,
                startDate: paperForm.paperDate
            },
            authors: authors.map(i=> {
                return {
                    partyId: i.partyId,
                    role: "author"
                }
            })
        }
        console.log("post paper:",packet)

        apiClient.post('api/paper', packet)
            .then(response => {
                console.log("response:",response);
                setLoading(false)
                if (response.status === 200) {
                    const action = key => (
                        <Fragment>
                            <Link to={{
                                pathname: "/dashboard/paper",
                                state: {paperId: response.data.paperId}
                            }}>
                                <Typography variant={"body2"} color={"textSecondary"}>{t("Dashboard.Paper.ShowPaperLink")}</Typography>
                            </Link>
                            <IconButton color={"inherit"} onClick={() => { closeSnackbar(key) }}>
                                <CloseIcon/>
                            </IconButton>
                        </Fragment>
                    );
                    enqueueSnackbar(t("Dashboard.Paper.SuccessAddPaper"), {
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
        <FrameDashboard {...props}>
            <Card className="p-4">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <InputText name="paperLocalId"
                                   label={t("Dashboard.Paper.PaperCode")}
                                   formValues={paperForm}
                                   setFormValues={setPaperForm}
                                   validation={validation}
                                   setValidation={setValidation}
                                   required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputSelect name="paperType"
                                     label={t("Dashboard.Paper.PaperType")}
                                     options={typeSelectOptions}
                                     formValues={paperForm}
                                     setFormValues={setPaperForm}
                                     validation={validation}
                                     setValidation={setValidation}
                                     required
                        />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={12}>
                        <InputText name="paperTitle"
                                   label={t("Dashboard.Paper.PaperTitle")}
                                   formValues={paperForm}
                                   setFormValues={setPaperForm}
                                   validation={validation}
                                   setValidation={setValidation}
                                   required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputText name="paperDesc"
                                   label={t("Dashboard.Paper.PaperDescription")}
                                   formValues={paperForm}
                                   setFormValues={setPaperForm}
                                   validation={validation}
                                   setValidation={setValidation}
                                   multiline
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputText name="paperKeywords"
                                   label={t("Dashboard.Paper.PaperKeywords")}
                                   formValues={paperForm}
                                   setFormValues={setPaperForm}
                                   validation={validation}
                                   setValidation={setValidation}
                        />
                    </Grid>

                    <Grid item xs={12}/>

                    <Grid item xs={4}>
                        <InputSelect name="paperPublisher"
                                     label={t("Dashboard.Paper.Publisher")}
                                     options={pubs.data}
                                     loading={!pubs.isReady}
                                     formValues={paperForm}
                                     setFormValues={setPaperForm}
                                     validation={validation}
                                     setValidation={setValidation}
                                     required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputSelect name="paperStatus"
                                     label={t("Dashboard.Paper.Status")}
                                     options={statusSelectOptions}
                                     formValues={paperForm}
                                     setFormValues={setPaperForm}
                                     validation={validation}
                                     setValidation={setValidation}
                                     required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputDate name="paperDate"
                                   label={t("Dashboard.Paper.Date")}
                                   formValues={paperForm}
                                   setFormValues={setPaperForm}
                                   validation={validation}
                                   setValidation={setValidation}
                                   required
                        />
                    </Grid>

                    <Grid item xs={12}/>

                    <Grid item xs={6}>
                        <ManageAuthors authors={authors} setAuthors={setAuthors}/>
                    </Grid>
                    <Grid item xs={6}>
                        <SearchAuthors addAuthors={addAuthors}/>
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                        <Box className="d-flex flex-row-reverse">
                            <ButtonAdv type="button" variant="contained" color="primary" className="width-medium" loading={loading.toString()} onClick={postPaper}>
                                {t("Action.Add")}
                            </ButtonAdv>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </FrameDashboard>
    );
}

export default PaperPage;
