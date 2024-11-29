import {getLanguage, useTranslation} from "react-multi-lang";
import React, {Fragment, useEffect} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {timestamp2Str, timestamp2Obj, obj2Timestamp} from "../services/tools";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {paperStatusList} from '../components/lexicon'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import TableFooter from "@material-ui/core/TableFooter";
import ListSubheader from "@material-ui/core/ListSubheader";
import apiClient from "../services/api";
import SelectField from "./select";
import {useSnackbar} from "notistack";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputSelect from "./formControls/inputSelect";
import Grid from "@material-ui/core/Grid";
import InputDate from "./formControls/inputDate";

export default function EnhancedTable(props) {
    const { publisher, setPublishers, paperId } = props;
    const t = useTranslation()
    const [pubs, setPubs] = React.useState({isReady:false,data:[]});
    const statusSelectOptions = paperStatusList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.PaperStatus."+item)
        }
    })
    useEffect(()=>{
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
    function Row(props) {
        const t = useTranslation()
        const {row} = props;
        const [open, setOpen] = React.useState(false);
        // const [status, setStatus] = React.useState(row.status);
        // const [date, setDate] = React.useState(timestamp2Obj(row.date));
        const [loading, setLoading] = React.useState(false);
        const {enqueueSnackbar,closeSnackbar } = useSnackbar();
        const [validation, setValidation] = React.useState({})
        const [paperForm, setPaperForm] = React.useState({});

        // const renderDateInput = ({ ref }) => (
        //     <TextField id="paper-date"
        //                size="small" fullWidth
        //                value={date ? date.year+'/'+date.month+'/'+date.day : ''}
        //                ref={ref}
        //     />
        // )
        const postPaperStatus = ()=>{
            setLoading(true);
            let packet = {
                publisher: {
                    partyId: row.partyId,
                    paperId: paperId,
                    ...paperForm,
                    // status: paperForm.status//status,
                    //date: obj2Timestamp(date)
                }
            }
            console.log('packet',packet)
            apiClient.post('api/paper/paperState', packet)
                .then(res => {
                    console.log("response:",res);
                    setLoading(false)
                    if (res.status === 200) {
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
                        const index = publisher.findIndex(i=>i.partyId===row.partyId)
                        let newData = Object.assign([],publisher)
                        newData[index] = Object.assign({},newData[index],paperForm)
                        setPublishers(newData)
                        setOpen(false)
                    }
                }).catch(err => {
                    console.error(err);
                    setLoading(false)
                });
        }
        return (
            <React.Fragment>
                <TableRow key={row.partyId}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell className="py-0">
                        {open ? (
                            <InputSelect name="status"
                                         options={statusSelectOptions}
                                         formValues={paperForm}
                                         setFormValues={setPaperForm}
                                         validation={validation}
                                         setValidation={setValidation}
                                         required
                                         inline
                            />
                        )
                            // <FormControl size="small" fullWidth>
                            //     <Select id="paper-status"
                            //             label={t("Dashboard.Paper.Status")}
                            //             labelId="paper-status-label"
                            //             autoWidth
                            //             value={status}
                            //             onChange={e=> setStatus(e.target.value)}
                            //     >
                            //         {paperStatusList.map( i => {
                            //             return(
                            //                 <MenuItem value={i}>{t("Lexicons.PaperStatus."+i)}</MenuItem>
                            //             )
                            //         })}
                            //     </Select>
                            // </FormControl>
                            :t("Lexicons.PaperStatus."+row.status)
                        }
                    </TableCell>
                    <TableCell className="py-0">
                        {open ? (
                            <InputDate name="startDate"
                                       formValues={paperForm}
                                       setFormValues={setPaperForm}
                                       validation={validation}
                                       setValidation={setValidation}
                                       required
                                       inline
                            />
                        )
                            // <DatePicker
                            //     value={date}
                            //     onChange={setDate}
                            //     renderInput={renderDateInput}
                            //     shouldHighlightWeekends
                            //     locale={getLanguage()}
                            //     calendarClassName="responsive-calendar"
                            //     className="w-100"
                            // />
                            :timestamp2Str(row.date)
                        }
                    </TableCell>
                    <TableCell className="py-0" align="right">
                        {open
                            ?<React.Fragment>
                                <Tooltip title={t("Action.Cancel")}>
                                    <IconButton onClick={() => setOpen(false)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={t("Action.Save")}>
                                    <IconButton onClick={postPaperStatus}>
                                        <DoneIcon/>
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                            :<Tooltip title={t("Action.Edit")}>
                                <IconButton onClick={() => setOpen(true)}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                        }
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }
    function TableNewRow() {
        const t = useTranslation()
        const { enqueueSnackbar,closeSnackbar } = useSnackbar();
        const [loading, setLoading] = React.useState(false);
        const [newRow, setNewRow] = React.useState(false);
        const [validation, setValidation] = React.useState({})
        const [paperForm, setPaperForm] = React.useState({startDate: new Date()});
        // const [publisher, setPublisher] = React.useState({
        //     paperId: paperId,
        //     partyId: '',
        //     status: '',
        //     date: timestamp2Obj(null)
        // });
        const [date, setDate] = React.useState(timestamp2Obj(null));

        // const handleNewStatus = (e)=>{
        //     setPublisher(prevState=>({
        //         ...prevState,
        //         [e.target.name]: e.target.value
        //     }))
        // }
        const postPaperStatus = ()=>{
            setLoading(true);
            let packet = {
                paperId: paperId,
                // author: {},
                publisher: {
                    role: "publisher",
                    ...paperForm,
                }
            }
            console.log('packet',packet)
            apiClient.post('api/paper/party', packet)
                .then(res => {
                    console.log("response:",res);
                    setLoading(false)
                    setNewRow(false)
                    if (res.status === 200) {
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
                        setPublishers(publisher.concat({
                            ...paperForm,
                            name: pubs.data.find(i=>i.value===paperForm.partyId).label,
                            startDate: paperForm.startDate
                        }))
                    }
                }).catch(error => {
                console.error(error);
                setLoading(false)
            });
        }
        const renderDateInput = ({ ref }) => (
            <TextField id="paper-date"
                       size="small" fullWidth
                       value={date ? date.year+'/'+date.month+'/'+date.day : ''}
                       ref={ref}
            />
        )

        return (
            <TableFooter>
                {
                    newRow ?
                        <TableRow>
                            <TableCell component="th" scope="row" className="py-0">
                                <InputSelect name="partyId"
                                             options={pubs.data}
                                             loading={!pubs.isReady}
                                             formValues={paperForm}
                                             setFormValues={setPaperForm}
                                             validation={validation}
                                             setValidation={setValidation}
                                             required
                                             inline
                                />
                                {/*<SelectField id="paper-publisher" size="small" name="partyId"*/}
                                {/*             options={props.pubs.data}*/}
                                {/*             loaded={props.pubs.isReady.toString()}*/}
                                {/*             value={publisher.partyId}*/}
                                {/*             onChange={handleNewStatus}*/}
                                {/*/>*/}
                            </TableCell>
                            <TableCell className="py-0">
                                <InputSelect name="status"
                                             options={statusSelectOptions}
                                             formValues={paperForm}
                                             setFormValues={setPaperForm}
                                             validation={validation}
                                             setValidation={setValidation}
                                             required
                                             inline
                                />
                                {/*<SelectField id="paper-status" size="small" name="status"*/}
                                {/*             options={statusSelectOptions}*/}
                                {/*             value={publisher.status}*/}
                                {/*             onChange={handleNewStatus}*/}
                                {/*/>*/}
                            </TableCell>
                            <TableCell className="py-0">
                                <InputDate name="startDate"
                                           formValues={paperForm}
                                           setFormValues={setPaperForm}
                                           validation={validation}
                                           setValidation={setValidation}
                                           required
                                           inline
                                />
                                {/*<DatePicker name="date" disabled*/}
                                {/*    value={date}*/}
                                {/*    onChange={setDate}*/}
                                {/*    renderInput={renderDateInput}*/}
                                {/*    shouldHighlightWeekends*/}
                                {/*    locale={getLanguage()}*/}
                                {/*    calendarClassName="responsive-calendar"*/}
                                {/*    className="w-100"*/}
                                {/*/>*/}
                            </TableCell>
                            <TableCell align="right" className="py-0">
                                <Tooltip title={t("Action.Cancel")}>
                                    <IconButton onClick={() => setNewRow(false)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={t("Action.Save")}>
                                    <IconButton onClick={postPaperStatus}>
                                        {loading ? <CircularProgress size={24} /> : <DoneIcon/>}
                                        {/*<DoneIcon/>*/}
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        :
                        <TableRow>
                            <TableCell colSpan={4} align="right" className="py-0">
                                <Tooltip title={t("Action.Add")}>
                                    <IconButton onClick={()=>setNewRow(true)}>
                                        <AddIcon/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                }
            </TableFooter>
        )
    }

    return (
        <Card variant={"outlined"} className="w-100">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width:"unset"}}>{t("Dashboard.Paper.Publisher")}</TableCell>
                        <TableCell style={{width:"20%"}}>{t("Dashboard.Paper.Status")}</TableCell>
                        <TableCell style={{width:"20%"}}>{t("Dashboard.Paper.Date")}</TableCell>
                        <TableCell style={{width:"140px"}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {publisher.map((historyRow) => (
                        <Row row={historyRow}/>
                    ))}
                </TableBody>
                <TableNewRow/>
            </Table>
        </Card>
    )
}
