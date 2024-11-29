import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import {getLanguage, useTranslation} from "react-multi-lang";
import apiClient from "../services/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {detectLang, timestamp2Str} from "../services/tools";
import {lighten, makeStyles} from "@material-ui/core/styles";

const rowStatusStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: lighten(theme.palette.success.main, 0.75),
    },
    danger: {
        backgroundColor: lighten(theme.palette.error.main, 0.9),
    },
    warning: {
        backgroundColor: lighten(theme.palette.warning.main, 0.9),
    },
    primary: {
        backgroundColor: lighten(theme.palette.info.main, 0.8),
    },
    secondary: {
        backgroundColor: lighten(theme.palette.grey.A200, 0.9),
        "& td":{
            color: "gray"
        }
    },
    other: {
    }
}));

function DataRow(props) {
    const { row } = props;
    const t = useTranslation()
    const status = row.publisher[0]?.status;
    const classes = rowStatusStyles();
    const classStatus =
        (status==='accepted') ? 'success' :
            (status==='rejected') ? 'danger' :
                (status==='underReview'||status==='submitted') ? 'primary' :
                    (status==='underEdit'||status==='readySubmit'||status==='submitting') ? 'warning' :
                        (status==='canceled') ? 'secondary' :
                            'other'
    return (
        <TableRow className={classes[classStatus]}>
            <TableCell component="th" scope="row">{row.paper.localId}</TableCell>
            <TableCell align={detectLang(row.paper.title)===getLanguage()?"left":"right"} dir={detectLang(row.paper.title)==='en'?"ltr":"rtl"}>
                <Typography noWrap>
                    {row.paper.title}
                </Typography>
            </TableCell>
            <TableCell>{t('Lexicons.PaperType.'+row.paper.type)}</TableCell>
            <TableCell>{t('Lexicons.PaperStatus.'+status)}</TableCell>
            <TableCell>{timestamp2Str(row.publisher[0]?.date)}</TableCell>
        </TableRow>

    );
}

const TableHeader = (probs)=>{
    const {classname} = probs;
    const t = useTranslation()
    const headCells = [
        { id: 'localId', width: '13%', label: t("Dashboard.Paper.PaperCode") },
        { id: 'title', width: '45%',  label: t("Dashboard.Paper.PaperTitle") },
        { id: 'type', width: '14%',  label: t("Dashboard.Paper.PaperType") },
        { id: 'status', width: '14%',  label: t("Dashboard.Paper.Status") },
        { id: 'date', width: '14%',  label: t("Dashboard.Paper.Date") },
    ];
    return(
        <TableHead>
            <TableRow>
                {headCells.map(headCell=>(
                    <TableCell
                        component={"th"}
                        style={{width:headCell.width}}
                        key={headCell.id}
                        className={classname}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const LoadingRow = ()=>{
    const t = useTranslation()
    return(
        <TableRow>
            <TableCell colSpan={5} align={"center"} className="p-4 text-secondary">
                <CircularProgress color={"inherit"}/>
                <Box>{t("Action.LoadingData")}</Box>
            </TableCell>
        </TableRow>
    )
}

const EmptyRow = ()=>{
    const t = useTranslation()
    return(
        <TableRow>
            <TableCell colSpan={5} align={"center"} className="p-4 text-secondary">
                <Box>{t("Dashboard.Paper.NoPaper")}</Box>
            </TableCell>
        </TableRow>
    )
}

export default function RecentPaperTable() {
    const t = useTranslation()
    const [loadFlag, setLoadFlag] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    useEffect(()=>{
        apiClient.get('api/paper/party').then((res)=>{
            setLoadFlag(true)
            setRows(res.data.slice(0,5))
        }).catch((err)=>{
            console.log("get papers error",err)
            setLoadFlag(true)
        })
    },[])

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" color="inherit" noWrap className="p-3">
                {t("Dashboard.Paper.RecentPapers")}
            </Typography>
            <Table size="small" style={{tableLayout:"fixed"}}>
                <caption><Link to="/dashboard/papersList">{t("Dashboard.Paper.FullPaperListLink")}</Link></caption>
                <TableHeader classname={(!loadFlag || (loadFlag && rows.length===0))?"text-secondary":""}/>
                <TableBody>
                    {loadFlag?
                        rows.length>0?
                            rows.map((row) => (
                                <DataRow key={row.paper.paperId} row={row} />
                            ))
                            :
                            <EmptyRow/>
                        :
                        <LoadingRow/>
                    }
                </TableBody>
            </Table>

        </TableContainer>
    );
}
