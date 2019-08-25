import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

export default function Welcome() {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome Pokémon Master
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                {'Let\'s catch your Pokémon here'}
            </Typography>
            <Fab href="/pokemon-list" variant="extended" aria-label="delete" className={classes.fab}>
                <NavigationIcon className={classes.extendedIcon} />
                START
            </Fab>
        </div>
    );
}