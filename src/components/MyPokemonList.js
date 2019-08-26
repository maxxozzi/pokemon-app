import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from './PaginationRedux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { releasePokemon } from '../action';

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
    detailInfo: {
        backgroundColor: '#282c34', 
        color: '#fff',
    },
  }));

export default function PokemonList() {
    const [page, setPage] = useState(0);
    const [list, setList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAlert, setOpenAlert] = useState(false);
    const [index, setIndex] = useState(0);

    const myPokemon = useSelector(state => state.pokemon);
    const dispatch = useDispatch();
    const classes = useStyles();

    function handleChangePage(event, newPage) {
        setPage(newPage);
      }
    
    function toogleAlert() {
        setOpenAlert(!openAlert);
    }
    
    function releaseDialog(index) {
        setIndex(index);
        setOpenAlert(!openAlert);
    }

    function release() {
        dispatch(releasePokemon(index));
        setOpenAlert(!openAlert);
    }

    function handleChangeRowsPerPage(event) {
        let limit = parseInt(event.target.value, 10);
        setRowsPerPage(limit);
        setPage(0);
      }

    useEffect(() => {
        setList(myPokemon);
      }, []);

    return (
        <div>
            <Typography variant="h2" component="h1" gutterBottom>
                My Pokémon
            </Typography>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Nickname</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.length !== 0 ? (
                                list.map((value, i) => (
                                    <StyledTableRow key={value.pokemon.name}>
                                        <TableCell component="th" scope="row">
                                        {(i + 1) + (page * rowsPerPage)}
                                        </TableCell>
                                        <TableCell align="center" style={{fontWeight: 'bold'}}>{value.pokemon.name}</TableCell>
                                        <TableCell align="center" style={{fontWeight: 'bold'}}>{value.pokemon.nickname}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Release Pokemon">
                                                <IconButton aria-label="release pokemon" onClick={() => releaseDialog(i)}>
                                                    <LockOpenIcon />
                                                </IconButton>
                                            </Tooltip>
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
                                    count={list.length}
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
            <Dialog
                classes={{paper: classes.detailInfo}}
                open={openAlert}
                onClose={() => toogleAlert()}
                disableBackdropClick={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Release Pokémon
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: '#fff'}} id="alert-dialog-description">
                        Are you sure to release this Pokémon ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toogleAlert()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => release()} color="primary">
                        Release
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}