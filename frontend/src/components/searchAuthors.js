import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import {useTranslation} from "react-multi-lang";
import apiClient from "../services/api";
import TextField from "@material-ui/core/TextField";


function createData(partyId, firstName, lastName, email) {
    return { partyId, firstName, lastName, email };
}



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



// const headCells = [
//     { id: 'lastName', numeric: false, disablePadding: true, label: t("User.Surname") },
//     // { id: 'firstName', numeric: false, disablePadding: true, label: useTranslation("User.Name") },
//     // { id: 'email', numeric: false, disablePadding: true, label: useTranslation("User.Email") },
//     { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//     { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//     { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//     // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const t = useTranslation()
    const headCells = [
        { id: 'lastName', numeric: false, disablePadding: false, label: t("User.Surname") },
        { id: 'firstName', numeric: false, disablePadding: false, label: t("User.Name") },
        { id: 'email', numeric: false, disablePadding: false, label: t("Login.Email") },
        // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
        // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
        // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
        // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
    ];

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                        color={"primary"}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
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
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: '0',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.info.main,
                backgroundColor: lighten(theme.palette.info.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    searchbar:{
        border: "1px solid #ddd",
        borderRadius: "100px",
        margin: "14px",
        marginBottom: "0",
        minHeight: "50px"
    }
}));

// const callWithoutArgument = () => {
//     //Calling a function of other class (without arguments)
//     import("manageAuthors")
//     new Table().addRow(["u2", 'test2', 'test', 'test', 'test']);
// };





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
    selected: {
        backgroundColor: lighten(theme.palette.info.light, 0.85),
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

export default function EnhancedTable(props) {
    const classes = useStyles();

    // const rows = [
    //     createData(2,'Alireza', 'Garivani', 'alim11@gmail.com'),
    //     createData(1,'مجتبی', 'فاضلی نیا', 'mfazelinia@gmail.com')
    // ];
    const [rows, setRows] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('lastName');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const addAuthor = (event,selectedData,addAuthors) => {
        console.log("ssssss",rows)
        console.log(selectedData)
        let newAuthors = rows.filter( i => selectedData.includes( i.partyId ) );
        console.log("newAuthors",newAuthors)
        addAuthors(newAuthors)
        // document.getElementById("btnAddAuthorIntoList").setAttribute("data", JSON.stringify(newAuthors))
        document.getElementById("btnAddAuthorIntoList").click()

    }

    const [keyword, setKeyword] = React.useState('');
    const searchPerson = ()=>{
        apiClient.get('api/party/person/search?text='+keyword ).then((res)=>{
            setRows(res.data)
        }).catch((err)=>{
            console.warn("search person err..",err)
        })
    }

    const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();
        const { numSelected, selectedData } = props;
        const t = useTranslation()

        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                    [classes.searchbar]: numSelected === 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} {t("Action.Selected")}
                    </Typography>
                ) : (
                    <InputBase fullWidth placeholder={t("Dashboard.Paper.SearchAuthors")}
                               defaultValue={keyword}
                               onBlur={(e)=>setKeyword(e.target.value)}
                    />
                )}

                {numSelected > 0 ? (
                    <Tooltip title={t("Action.Add")}>
                        <IconButton aria-label="add" onClick={(event)=>addAuthor(event,selectedData,props.addAuthors)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title={t("Dashboard.Paper.Search")}>
                        <IconButton aria-label="search author" onClick={searchPerson}>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    };
    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.partyId);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Card variant="outlined">
                <EnhancedTableToolbar numSelected={selected.length} selectedData={selected} addAuthors={props.addAuthors} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.partyId);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.partyId)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.partyId}
                                            selected={isItemSelected}
                                            classes={{selected:classes.selected}}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox color={"primary"}
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell id={labelId} scope="row">{row.lastName}</TableCell>
                                            <TableCell>{row.firstName}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
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
        </div>
    );
}
