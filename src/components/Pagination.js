import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(2.5),
    },
  }));

export default function TablePaginationActions(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    function handleFirstPageButtonClick() {
      let limit = String(rowsPerPage);
      axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
        .then(function (res) {
            let value = res.data;
            onChangePage(value, 0);
        })
        .catch(function (err) {
            console.log(err);
        });
    }
  
    function handleBackButtonClick() {
      let limit = String(rowsPerPage);
      let offset = String((page - 1) * rowsPerPage);
      axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then(function (res) {
            let value = res.data;
            onChangePage(value, page - 1);
        })
        .catch(function (err) {
            console.log(err);
        });
    }
  
    function handleNextButtonClick() {
      let limit = String(rowsPerPage);
      let offset = String((page + 1) * rowsPerPage);
      axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then(function (res) {
            let value = res.data;
            onChangePage(value, page + 1);
        })
        .catch(function (err) {
            console.log(err);
        });
    }
  
    function handleLastPageButtonClick() {
      let limit = String(rowsPerPage);
      let offset = String((Math.max(0, Math.ceil(count / rowsPerPage) - 1)) * rowsPerPage);
      axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then(function (res) {
            let value = res.data;
            onChangePage(value, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        })
        .catch(function (err) {
            console.log(err);
        });
    }
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }