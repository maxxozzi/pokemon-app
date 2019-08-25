import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Welcome from './components/Welcome';
import PokemonList from './components/PokemonList';
import MyPokemon from './components/MyPokemonList';
import PokemonDetail from './components/PokemonDetail';
import FooterComponent from './components/Footer';
import ListItemLink from './components/ListItem'; 
import Logo from './image/logo2.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: '#282c34',
    color: '#fff',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
    color: '#fff'
  },
  paper: {
    background: "#282c34"
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#34495e',
  },
}));

function App() {
  const [listMenu, setListMenu] = useState(false);

  function toggleDrawer() {
    setListMenu(!listMenu);
  }

  const classes = useStyles();
  return (
    <Router>
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#34495e'}}>
        <Toolbar>
          <IconButton href="/" className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
            <img alt="Logo" src={Logo} style={{height:30}} />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            Pokémon App
          </Typography>
          <IconButton
            aria-label="list menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => toggleDrawer()}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Route exact path="/" render={() => ( <Welcome /> )} />
        <Route path="/my-pokemon-list" render={() => ( <MyPokemon /> )} />
        <Route path="/pokemon-list" render={() => ( <PokemonList /> )} />
        <Route path="/pokemon-detail" render={() => ( <PokemonDetail /> )} />
      </Container>
      <Drawer classes={{paper: classes.paper}} anchor="right" open={listMenu} onClose={() => toggleDrawer()}>
        <div
          className={classes.list}
          role="presentation"
          onClick={() => toggleDrawer()}
          onKeyDown={() => toggleDrawer()}
        >
          <List>
            <ListItemLink to="/pokemon-list" primary="List Pokémon" icon={<ListAltIcon />} />
            <ListItemLink to="/my-pokemon-list" primary="My Pokémon" icon={<PersonPinIcon />} />
          </List>
        </div>
      </Drawer>
      <footer className={classes.footer}>
        <FooterComponent />
      </footer>
    </div>
    </Router>
  );
}

export default App;
