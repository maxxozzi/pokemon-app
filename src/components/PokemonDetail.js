import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../image/logo2.png';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PetsIcon from '@material-ui/icons/Pets';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setOwnedPokemon } from '../action';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#34495e',
    },
    bigAvatar: {
        margin: 10,
        width: 90,
        height: 90,
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    inputField: {
        color: '#fff',
    },
    labelField: {
        color: '#95a5a6',
    },
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    detailInfo: {
        backgroundColor: '#282c34', 
        color: '#fff',
    },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function PokemonDetail() {
    const [information, setInformation] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [infoType, setInfoType] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [titleAlert, setTitleAlert] = useState('');
    const [contentAlert, setContentAlert] = useState('');
    const [nickname, setNickname] = useState('');
    const [input, setInput] = useState(false);

    const classes = useStyles();
    const myPokemon = useSelector(state => state.pokemon);
    const dispatch = useDispatch();

    async function detailInfo(e) {
        await setInfoType(e);
        setOpenModal(!openModal);
    }

    function toogle() {
        setOpenModal(!openModal);
    }

    function toogleAlert() {
        setOpenAlert(!openAlert);
    }

    function addCollection() {
        dispatch(setOwnedPokemon({name: information.name, nickname: nickname}));
        setOpenAlert(!openAlert);
    }

    async function catchPokemon() {
        let random = Math.random() >= 0.5;
        if (random === true) {
            await Promise.all([
                setTitleAlert('Success'), 
                setContentAlert('Pokémon succesfully caught'),
                setInput(true)
            ]);
            setOpenAlert(!openAlert);
        } else {
            await Promise.all([
                setTitleAlert('Fail'), 
                setContentAlert('You fail to catch the Pokémon, please try again')
            ]);
            setOpenAlert(!openAlert);
        }
    }

    function getInitialData() {
        let url = new URLSearchParams(window.location.search);
        let name = url.get('name');
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(function (res) {
            let value = res.data;
            setInformation(value);
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
                Pokémon Detail
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {information.name}
                        </Typography>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Pokemon image 1" src={Object.keys(information).length === 0 ? Logo : information.sprites.front_default} className={classes.bigAvatar} />
                            <Avatar alt="Pokemon image 2" src={Object.keys(information).length === 0 ? Logo : information.sprites.back_default} className={classes.bigAvatar} />
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container justify="center" alignItems="center">
                            {myPokemon.length === 0 ? (
                                <Fab onClick={() => catchPokemon()} variant="extended" aria-label="Catch" className={classes.fab}>
                                    <img alt="Poke ball" src={Logo} style={{height: 30, marginRight: 5}} />
                                    Catch It
                                </Fab>
                            ) : (
                                typeof (myPokemon.find(value => value.pokemon.name === information.name)) === "undefined" ? 
                                (
                                    <Fab onClick={() => catchPokemon()} variant="extended" aria-label="Catch" className={classes.fab}>
                                        <img alt="Poke ball" src={Logo} style={{height: 30, marginRight: 5}} />
                                        Catch It
                                    </Fab>    
                                ) : (
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        This Pokémon is yours
                                    </Typography>
                                )
                            )}
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container justify="center" alignItems="center">
                            <Fab onClick={() => detailInfo('Moves')} variant="extended" aria-label="Moves" className={classes.fab}>
                                <DirectionsRunIcon className={classes.extendedIcon} />
                                Moves
                            </Fab>
                            <Fab onClick={() => detailInfo('Types')} variant="extended" aria-label="Types" className={classes.fab}>
                                <PetsIcon className={classes.extendedIcon} />
                                Types
                            </Fab>
                            <Fab onClick={() => detailInfo('Abilities')} variant="extended" aria-label="Ability" className={classes.fab}>
                                <WhatshotIcon className={classes.extendedIcon} />
                                Abilities
                            </Fab>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog classes={{paper: classes.detailInfo}} fullScreen open={openModal} onClose={() => toogle()} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} style={{backgroundColor: '#34495e'}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => toogle()} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {infoType}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {infoType === 'Moves' ? (
                        Object.keys(information).length === 0 ? null : (
                            information.moves.map((value) => (
                                <ListItem key={value.move.name}>
                                    <ListItemIcon style={{color: '#fff'}}>
                                        <DirectionsRunIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={value.move.name} />
                                </ListItem>
                            ))
                        )
                    ) : null}
                    {infoType === 'Types' ? (
                        Object.keys(information).length === 0 ? null : (
                            information.types.map((value) => (
                                <ListItem key={value.type.name}>
                                    <ListItemIcon style={{color: '#fff'}}>
                                        <PetsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={value.type.name} />
                                </ListItem>
                            ))
                        )
                    ) : null}
                    {infoType === 'Abilities' ? (
                        Object.keys(information).length === 0 ? null : (
                            information.abilities.map((value) => (
                                <ListItem key={value.ability.name}>
                                    <ListItemIcon style={{color: '#fff'}}>
                                        <WhatshotIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={value.ability.name} />
                                </ListItem>
                            ))
                        )
                    ) : null}
                </List>
            </Dialog>
            <Dialog
                classes={{paper: classes.detailInfo}}
                open={openAlert}
                onClose={() => toogleAlert()}
                disableBackdropClick={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {titleAlert}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: '#fff'}} id="alert-dialog-description">
                        {contentAlert}
                    </DialogContentText>
                    {input === true ? (
                        <Grid container justify="center" alignItems="center">
                            <TextField
                                label="Nickname"
                                className={classes.textField}
                                InputLabelProps={{className: classes.labelField}}
                                InputProps={{className: classes.inputField}}
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                margin="normal"
                            />
                        </Grid>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    {input === true ? (
                        <Button onClick={() => addCollection()} color="primary">
                            Add to Collection
                        </Button>
                    ) : (
                        <Button onClick={() => toogleAlert()} color="primary">
                            Ok
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}