// import React from 'react';
// import MaterialTable from 'material-table';
// import {useTranslation} from "react-multi-lang";
//
// import { forwardRef } from 'react';
// import AddBox from '@material-ui/icons/AddBox';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
// import Clear from '@material-ui/icons/Clear';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';
// import Edit from '@material-ui/icons/Edit';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
// import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
// import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';
//
// const tableIcons = {
//     Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//     Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//     Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//     DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//     Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//     Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//     FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//     LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//     NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//     ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//     SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//     ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//     ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
// };
//
// export default function MaterialTableDemo() {
//     const t = useTranslation()
//     const [state, setState] = React.useState({
//         columns: [
//             { title: t("User.Surname"), field: 'lastName' },
//             { title: t("User.Name"), field: 'firstName' },
//             { title: t("Login.Email"), field: 'email' },
//         ],
//         data: [
//             { firstName: 'Mehmet', lastName: 'Baran', email: 1987 },
//             { firstName: 'Zerya Betül', lastName: 'Baran', email: 2017 },
//         ],
//     });
//
//     return (
//         <MaterialTable
//             title="Editable Example"
//             columns={state.columns}
//             data={state.data}
//             icons={tableIcons}
//             actions={[
//                 {
//                     icon: 'Filter',
//                     tooltip: 'Save User',
//                     onClick: (event, rowData) => alert("You saved " + rowData.firstName)
//                 }
//             ]}
//             editable={{
//                 onRowAdd: (newData) =>
//                     new Promise((resolve) => {
//                         setTimeout(() => {
//                             resolve();
//                             setState((prevState) => {
//                                 const data = [...prevState.data];
//                                 data.push(newData);
//                                 return { ...prevState, data };
//                             });
//                         }, 600);
//                     }),
//                 onRowUpdate: (newData, oldData) =>
//                     new Promise((resolve) => {
//                         setTimeout(() => {
//                             resolve();
//                             if (oldData) {
//                                 setState((prevState) => {
//                                     const data = [...prevState.data];
//                                     data[data.indexOf(oldData)] = newData;
//                                     return { ...prevState, data };
//                                 });
//                             }
//                         }, 600);
//                     }),
//                 onRowDelete: (oldData) =>
//                     new Promise((resolve) => {
//                         setTimeout(() => {
//                             resolve();
//                             setState((prevState) => {
//                                 const data = [...prevState.data];
//                                 data.splice(data.indexOf(oldData), 1);
//                                 return { ...prevState, data };
//                             });
//                         }, 600);
//                     }),
//             }}
//         />
//     );
// }








// import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { lighten, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import Card from "@material-ui/core/Card";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from '@material-ui/icons/Search';
// import {useTranslation} from "react-multi-lang";
//
//
// function createData(partyId, firstName, lastName, email) {
//     return { partyId, firstName, lastName, email };
// }
//
// let user = JSON.parse(sessionStorage.getItem('user'));
// const rows = [
//     createData(user.partyId,user.firstName, user.lastName, user.email),
// ];
//
// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }
//
// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }
//
// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }
//
//
//
// // const headCells = [
// //     { id: 'lastName', numeric: false, disablePadding: true, label: t("User.Surname") },
// //     // { id: 'firstName', numeric: false, disablePadding: true, label: useTranslation("User.Name") },
// //     // { id: 'email', numeric: false, disablePadding: true, label: useTranslation("User.Email") },
// //     { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
// //     { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
// //     { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
// //     // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// // ];
//
// function EnhancedTableHead(props) {
//     const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };
//
//     const t = useTranslation()
//     const headCells = [
//         { id: 'lastName', numeric: false, disablePadding: false, label: t("User.Surname") },
//         { id: 'firstName', numeric: false, disablePadding: false, label: t("User.Name") },
//         { id: 'email', numeric: false, disablePadding: false, label: t("Login.Email") },
//         // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//         // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//         // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//         // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
//     ];
//
//     return (
//         <TableHead>
//             <TableRow>
//                 <TableCell padding="checkbox">
//                     <Checkbox
//                         indeterminate={numSelected > 0 && numSelected < rowCount}
//                         checked={rowCount > 0 && numSelected === rowCount}
//                         onChange={onSelectAllClick}
//                         inputProps={{ 'aria-label': 'select all desserts' }}
//                     />
//                 </TableCell>
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         key={headCell.id}
//                         align={headCell.numeric ? 'right' : 'left'}
//                         padding={headCell.disablePadding ? 'none' : 'default'}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }
//
// EnhancedTableHead.propTypes = {
//     classes: PropTypes.object.isRequired,
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };
//
// const useToolbarStyles = makeStyles((theme) => ({
//     root: {
//         paddingLeft: theme.spacing(2),
//         paddingRight: theme.spacing(1),
//     },
//     highlight:
//         theme.palette.type === 'light'
//             ? {
//                 color: theme.palette.secondary.main,
//                 backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//             }
//             : {
//                 color: theme.palette.text.primary,
//                 backgroundColor: theme.palette.secondary.dark,
//             },
//     title: {
//         flex: '1 1 100%',
//     },
//     searchbar:{
//         border: "1px solid #ddd",
//         borderRadius: "100px",
//         margin: "14px",
//         marginBottom: "0",
//         minHeight: "50px"
//     }
// }));
//
// const EnhancedTableToolbar = (props) => {
//     const classes = useToolbarStyles();
//     const { numSelected } = props;
//     const t = useTranslation()
//
//     return (
//         <Toolbar
//             className={clsx(classes.root, {
//                 [classes.highlight]: numSelected > 0,
//             })}
//         >
//             {numSelected > 0 ? (
//                 <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
//                     {numSelected} {t("Action.Selected")}
//                 </Typography>
//             ) : (
//                 <Typography>{t("Dashboard.Paper.AuthorsList")}</Typography>
//             )}
//
//             {numSelected > 0 ? (
//                 <Tooltip title="Delete">
//                     <IconButton aria-label="delete">
//                         <DeleteIcon />
//                     </IconButton>
//                 </Tooltip>
//             ) : (
//                 <Typography></Typography>
//             )}
//         </Toolbar>
//     );
// };
//
// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//     },
//     paper: {
//         width: '100%',
//         marginBottom: theme.spacing(2),
//     },
//     table: {
//         //minWidth: 750,
//     },
//     visuallyHidden: {
//         border: 0,
//         clip: 'rect(0 0 0 0)',
//         height: 1,
//         margin: -1,
//         overflow: 'hidden',
//         padding: 0,
//         position: 'absolute',
//         top: 20,
//         width: 1,
//     },
// }));
//
// export default function EnhancedTable() {
//     const classes = useStyles();
//     const t = useTranslation()
//
//     const [order, setOrder] = React.useState('asc');
//     const [orderBy, setOrderBy] = React.useState('calories');
//     const [selected, setSelected] = React.useState([]);
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
//
//     const handleRequestSort = (event, property) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };
//
//     const handleSelectAllClick = (event) => {
//         if (event.target.checked) {
//             const newSelecteds = rows.map((n) => n.partyId);
//             setSelected(newSelecteds);
//             return;
//         }
//         setSelected([]);
//     };
//
//     const handleClick = (event, name) => {
//         const selectedIndex = selected.indexOf(name);
//         let newSelected = [];
//
//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, name);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selected.slice(0, selectedIndex),
//                 selected.slice(selectedIndex + 1),
//             );
//         }
//
//         setSelected(newSelected);
//     };
//
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };
//
//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//
//
//
//     const isSelected = (name) => selected.indexOf(name) !== -1;
//
//     const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
//
//     return (
//         <div className={classes.root}>
//             <Card variant="outlined">
//                 <EnhancedTableToolbar numSelected={selected.length} />
//                 <TableContainer>
//                     <Table
//                         className={classes.table}
//                         aria-labelledby="tableTitle"
//                         aria-label="enhanced table"
//                         id="tblPaperAuthors"
//                     >
//                         <EnhancedTableHead
//                             classes={classes}
//                             numSelected={selected.length}
//                             order={order}
//                             orderBy={orderBy}
//                             onSelectAllClick={handleSelectAllClick}
//                             onRequestSort={handleRequestSort}
//                             rowCount={rows.length}
//                         />
//                         <TableBody>
//                             {stableSort(rows, getComparator(order, orderBy))
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((row, index) => {
//                                     const isItemSelected = isSelected(row.partyId);
//                                     const labelId = `enhanced-table-checkbox-${index}`;
//
//                                     return (
//                                         <TableRow
//                                             hover
//                                             onClick={(event) => handleClick(event, row.partyId)}
//                                             role="checkbox"
//                                             aria-checked={isItemSelected}
//                                             tabIndex={-1}
//                                             key={row.partyId}
//                                             selected={isItemSelected}
//                                         >
//                                             <TableCell padding="checkbox">
//                                                 <Checkbox
//                                                     checked={isItemSelected}
//                                                     inputProps={{ 'aria-labelledby': labelId }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell id={labelId} scope="row">{row.lastName}</TableCell>
//                                             <TableCell>{row.firstName}</TableCell>
//                                             <TableCell align="right">{row.email}</TableCell>
//                                         </TableRow>
//                                     );
//                                 })}
//                             {emptyRows > 0 && (
//                                 <TableRow>
//                                     <TableCell colSpan={6} />
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 25]}
//                     component="div"
//                     count={rows.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onChangePage={handleChangePage}
//                     onChangeRowsPerPage={handleChangeRowsPerPage}
//                 />
//             </Card>
//         </div>
//     );
// }







import React from 'react'
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
import Card from "@material-ui/core/Card";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from '@material-ui/icons/Search';
import {useTranslation} from "react-multi-lang";
// import AddIcon from "@material-ui/icons/Add";

// const t = useTranslation()
// const user = JSON.parse(sessionStorage.getItem('user'));
const useToolbarStyles = makeStyles((theme) => ({
    title: {
        margin: "14px",
        marginBottom: "0",
        minHeight: "50px",
        lineHeight: "50px"
    }
}));

class Table2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            table: this.props.authors,
        };
    }

    handleChange = () => {
        // this.props.onTemperatureChange(e.target.value);
        const table = this.props.authors
        console.log("handleChange",table)
        this.setState({ table })
    }

    delRow = id => {
        const table = this.props.authors//this.state.table.slice()
        table.splice(table.map(function(e) { return e.partyId; }).indexOf(id), 1);
        this.props.setAuthors(table)//this.setState({ table })
        this.handleChange()
    }

    render() {
        const rows = this.state.table
        return (
            <div>
                <div>
                    <Card variant="outlined">
                        <TableContainer>
                            <TableTitle/>
                            <Table>
                                <TableHeaders />
                                <TableBody>
                                    {
                                        rows.map(row => <TableRow key={row.partyId} row={row} delRow={this.delRow}/>)
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/*<TablePagination*/}
                        {/*    rowsPerPageOptions={[5, 10, 25]}*/}
                        {/*    component="div"*/}
                        {/*    count={rows.length}*/}
                        {/*    rowsPerPage={rowsPerPage}*/}
                        {/*    page={page}*/}
                        {/*    onChangePage={handleChangePage}*/}
                        {/*    onChangeRowsPerPage={handleChangeRowsPerPage}*/}
                        {/*/>*/}
                    </Card>
                </div>
                <AddRowButton handleChange={this.handleChange} />
                {/*<button type="button" hidden={true} onClick={} value="get"/>*/}
            </div>
        )
    }
}

const TableTitle = () => {
    const t = useTranslation()
    const classes = useToolbarStyles();
    return (
        <Typography className={classes.title}>{t("Dashboard.Paper.AuthorsList")}</Typography>
    )
}

const TableHeaders = ({ headers }) => {
    const t = useTranslation()
    const headCells = [
        { id: 'lastName', label: t("User.Surname") },
        { id: 'firstName', label: t("User.Name") },
        { id: 'email', label: t("Login.Email") },
        { id: 'action', label: ''}
    ];
    return (
        <TableHead>
            <tr>
                {headCells.map(header => <TableCell key={header.id}>{header.label}</TableCell>)}
            </tr>
        </TableHead>
    )
}

const TableRow = ({ row, delRow }) =>
    <tr>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell padding="none" align={"right"}>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={()=>delRow(row.partyId)}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        </TableCell>
    </tr>

const AddRowButton = ({ handleChange }) =>
    <button type="button"
            id="btnAddAuthorIntoList"
            className="hidden"
            onClick={() => {
                // let rowData = JSON.parse(document.getElementById("btnAddAuthorIntoList").getAttribute("data"))
                // rowData = rowData?rowData:[{}]
                // addRow(rowData)
                handleChange()
            }}>
        ADD ROW
    </button>


export default Table2





//
// import React, { Component } from 'react'
//
// class Table extends Component {
//     constructor(props) {
//         super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
//         this.state = { //state is by default an object
//             students: [
//                 { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
//                 { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
//                 { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
//                 { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
//             ]
//         }
//     }
//
//     renderTableData() {
//         return this.state.students.map((student, index) => {
//             const { id, name, age, email } = student //destructuring
//             return (
//                 <tr key={id}>
//                     <td>{id}</td>
//                     <td>{name}</td>
//                     <td>{age}</td>
//                     <td>{email}</td>
//                 </tr>
//             )
//         })
//     }
//
//     renderTableHeader() {
//         let header = Object.keys(this.state.students[0])
//         return header.map((key, index) => {
//             return <th key={index}>{key.toUpperCase()}</th>
//         })
//     }
//
//     addRow = row => {
//         const table = this.state.table.slice()
//         table.push(row)
//         this.setState({ table })
//     }
//
//     render() {
//         return (
//             <div>
//                 <h1 id='title'>React Dynamic Table</h1>
//                 <table id='students'>
//                     <tbody>
//                     <tr>{this.renderTableHeader()}</tr>
//                     {this.renderTableData()}
//                     </tbody>
//                 </table>
//                 <AddRowButton addRow={this.addRow} />
//             </div>
//         )
//     }
// }
//
// // const TableRow = ({ row }) =>
// //     <tr>
// //         { row.map(cell => <td>{cell}</td>) }
// //     </tr>
//
// const AddRowButton = ({ addRow }) =>
//     <button onClick={() => addRow(['test','test','test','test','test'])}>
//         ADD ROW
//     </button>
//
// export default Table //exporting a component make it reusable and this is the beauty of react









// import React, { useState } from 'react';
// var tableRowIndex = 0;
// function TableRow ({row, handleDataChange, deleteRow}) {
//     const index = row.index
//     const [first_name, handleChangeFirstName] = useState(row.first_name);
//     const [last_name, handleChangeLastName] = useState(row.last_name);
//
//     const updateValues = e => {
//         var inputName = e.target.name
//         var inputValue = e.target.value
//         if(inputName == 'first_name'){
//             handleChangeFirstName(inputValue)
//         }else if(inputName == 'last_name'){
//             handleChangeLastName(inputValue)
//         }
//
//         handleDataChange({
//             index: index,
//             first_name: first_name,
//             last_name: last_name
//         })
//     }
//
//     const removeRow = () => {
//         deleteRow(index)
//     }
//
//     return(
//         <tr>
//             <td>{index + 1}</td>
//             <td>
//                 <input type="text" name="first_name" className="first_name" placeholder="First Name" value={first_name} onChange={updateValues}></input>
//                 <input type="text" name="last_name"  className="last_name" placeholder="Last Name" value={last_name} onChange={updateValues}></input>
//             </td>
//             <td><button type="button" className="btn btn-remove" onClick={removeRow}>&times;</button></td>
//         </tr>
//     )
// }
//
// function Table() {
//     const [talbeRows, setRows] = useState([{
//         index: 0,
//         first_name: "",
//         last_name: ""
//     }
//     ]);
//
//     // Receive data from TableRow
//     const handleChange = data => {
//         talbeRows[data.index] = data
//     }
//
//     // Add New Table Row
//     const addNewRow = () => {
//         tableRowIndex = parseFloat(tableRowIndex) + 1
//         var updatedRows = [...talbeRows]
//         updatedRows[tableRowIndex] = {index: tableRowIndex, first_name: "", last_name: ""}
//         setRows(updatedRows)
//     }
//
//     // Remove Table row if rows are count is more than 1
//     const deleteRow = (index) => {
//         if(talbeRows.length > 1){
//             var updatedRows = [...talbeRows]
//             var indexToRemove = updatedRows.findIndex(x => x.index == index);
//             if(indexToRemove > -1){
//                 updatedRows.splice(indexToRemove, 1)
//                 setRows(updatedRows);
//             }
//         }
//     }
//
//     return (
//         <div className="customers">
//             <table className="table" id="customers">
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th></th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {
//                     talbeRows.map((row, index) => {
//                         if(row)
//                             return(
//                                 <TableRow key={index} row={row} handleDataChange={handleChange} deleteRow={deleteRow}></TableRow>
//                             )
//                     })
//                 }
//                 </tbody>
//             </table>
//             <div>
//                 <button className="btn-add" onClick={addNewRow}>+Add</button>
//             </div>
//         </div>
//     );
// }
//
// export default Table;