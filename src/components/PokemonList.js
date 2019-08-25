import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from './Pagination';
import Button from '@material-ui/core/Button';
import PageviewIcon from '@material-ui/icons/Pageview';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles(() => ({
    head: {
      backgroundColor: '#34495e',
      color: '#fff',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#95a5a6',
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#7f8c8d',
      },
      color: '#fff',
    },
  }))(TableRow);

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    progress: {
        margin: theme.spacing(2),
    },
  }));
  
export default function PokemonList() {
    const [page, setPage] = useState(0);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const classes = useStyles();

    function handleChangePage(event, newPage) {
        setPage(newPage);
        setList(event.results);
        setTotal(event.count);
      }
    
    function handleChangeRowsPerPage(event) {
        let limit = parseInt(event.target.value, 10);
        setRowsPerPage(limit);
        setPage(0);
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
        .then(function (res) {
            let value = res.data;
            setList(value.results);
            setTotal(value.count);
        })
        .catch(function (err) {
            console.log(err);
        });
      }

    function openDetail(event) {
        window.open(`/pokemon-detail/?name=${event}`);
    }
    
    function getInitialData() {
        let limit = String(rowsPerPage);
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
        .then(function (res) {
            let value = res.data;
            setList(value.results);
            setTotal(value.count);
        })
        .catch(function (err) {
            console.log(err);
        });
    }
    
    useEffect(() => {
        getInitialData();
      }, []);
    
    return (
        <div>
            <Typography variant="h2" component="h1" gutterBottom>
                Pokémon List
            </Typography>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.length !== 0 ? (
                                list.map((value, i) => (
                                    <StyledTableRow key={value.name}>
                                        <TableCell component="th" scope="row">
                                        {(i + 1) + (page * rowsPerPage)}
                                        </TableCell>
                                        <TableCell align="center" style={{fontWeight: 'bold'}}>{value.name}</TableCell>
                                        <TableCell align="center">
                                            <Button color="primary" size="small" onClick={() => openDetail(value.name)}>
                                                <PageviewIcon /><span> View Detail</span>
                                            </Button>
                                        </TableCell>
                                    </StyledTableRow>
                                ))
                            ) : null}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    colSpan={3}
                                    count={total}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        </div>
    );
}