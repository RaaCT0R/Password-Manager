import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import {useTranslation,getLanguage} from "react-multi-lang";
import Header from "../components/dashHeader";
import Footer from "../components/dashFooter";
import Card from "@material-ui/core/Card";
import EditIcon from '@material-ui/icons/Edit';
import Box from "@material-ui/core/Box";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import {lighten, makeStyles} from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import apiClient from "../services/api";
import Tooltip from "@material-ui/core/Tooltip";
import {detectLang, timestamp2Str} from "../services/tools";
import {Link} from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem('user'));


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    tableTitle: {
        padding: "16px"
    }
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const t = useTranslation()
    const headCells = [
        { id: 'localId', width: '15%', disablePadding: false, label: t("Dashboard.Paper.PaperCode") },
        { id: 'title', width: '45%', disablePadding: false, label: t("Dashboard.Paper.PaperTitle") },
        { id: 'type', width: '15%', disablePadding: false, label: t("Dashboard.Paper.PaperType") },
        { id: 'status', width: '15%', disablePadding: false, label: t("Dashboard.Paper.Status") },
    ];

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="none"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        style={{width:headCell.width}}
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell style={{width:"60px"}}></TableCell>
            </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        //minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

// function StatusBadge({status}) {
//     const t = useTranslation()
//     return (
//         <span className={"badge badge-pill badge-normal "
//         + (status==='accepted'?"badge-success":"")
//         + (status==='rejected'?"badge-danger":"")
//         + (status==='underReview'?"badge-primary":"")
//         + (status==='submitted'?"badge-primary":"")
//         + (status==='underEdit'?"badge-warning":"")
//         + (status==='readySubmit'?"badge-warning":"")
//         + (status==='submitting'?"badge-warning":"")
//         + (status==='canceled'?"badge-secondary":"")
//         }>
//             {t('Lexicons.PaperStatus.'+status)}
//         </span>
//     )
// }

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

function Row(props) {
    const t = useTranslation()
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const status = row.publisher[0]?.status;
    const classes = useRowStyles();
    const statusClasses = rowStatusStyles();
    const classStatus =
        (status==='accepted') ? 'success' :
            (status==='rejected') ? 'danger' :
                (status==='underReview'||status==='submitted') ? 'primary' :
                    (status==='underEdit'||status==='readySubmit'||status==='submitting') ? 'warning' :
                        (status==='canceled') ? 'secondary' :
                            'other'
    return (
        <React.Fragment>
            <TableRow className={[classes.root, statusClasses[classStatus]].join(' ')}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell scope="row">{row.paper.localId}</TableCell>
                <TableCell align={detectLang(row.paper.title)===getLanguage()?"left":"right"} dir={detectLang(row.paper.title)==='en'?"ltr":"rtl"}>
                    <Typography noWrap>
                        {row.paper.title}
                    </Typography>
                </TableCell>
                <TableCell>{t('Lexicons.PaperType.'+row.paper.type)}</TableCell>
                <TableCell>
                    {/*<StatusBadge status={row.publisher[0].status}/>*/}
                    {t('Lexicons.PaperStatus.'+status)}
                </TableCell>
                <TableCell padding="none">
                    <Tooltip title={t("Action.Edit")}>
                        <Link to={{
                            pathname: "/dashboard/paper",
                            state: {paperId: row.paper.paperId}
                        }}>
                            <IconButton>
                                <EditIcon/>
                            </IconButton>
                        </Link>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow className={statusClasses[classStatus]}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                {t("Dashboard.Paper.History")}:
                            </Typography>
                            <Table size="small" aria-label="history">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t("Dashboard.Paper.Publisher")}</TableCell>
                                        <TableCell>{t("Dashboard.Paper.Status")}</TableCell>
                                        <TableCell>{t("Dashboard.Paper.Date")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.publisher.map((historyRow) => (
                                        <TableRow key={historyRow.partyId}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.name}
                                            </TableCell>
                                            <TableCell>{t("Lexicons.PaperStatus."+historyRow.status)}</TableCell>
                                            <TableCell>{timestamp2Str(historyRow.date)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const PapersListPage = (props) => {
    const classes = useStyles();
    const t = useTranslation()
    const [rows, setRows] = React.useState([]);
    async function getPapers(){
        const res = await apiClient.get('api/paper/party' )//+ user.partyId
        return res.data
    }

    useEffect(() => {
        async function fetchData() {
            setRows(await getPapers())
        }
        fetchData()
    }, []);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('localId');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1 className={"frame-dashboard-title"}>{t('Dashboard.PapersList.Title')}</h1>
                <Card>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                            style={{tableLayout:"fixed"}}
                        >
                            <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <Row key={row.paper.paperId} row={row} />
                                    );
                                    })}
                                {emptyRows > 0 && ( ()=> {
                                        [...Array(emptyRows)].map((e,i) => {
                                            console.log('emptyRows',emptyRows)
                                            return(
                                                <TableRow>
                                                    <TableCell key={i} colSpan={6}/>
                                                </TableRow>
                                            )
                                        })
                                    }
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Card>

            </Container>
            <Footer/>
        </div>
    );
}

export default PapersListPage;
