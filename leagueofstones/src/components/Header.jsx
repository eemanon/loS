import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import EventIcon from 'material-ui-icons/Event';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import Search from 'material-ui-icons/Search';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import FaceIcon from 'material-ui-icons/Face';
import Avatar from 'material-ui/Avatar';
import MenuAccount from './menus/MenuAccount.jsx';

import { connect } from 'react-redux';
import {withRouter} from 'react-router';

var path = require('../backendPath.js').backendpath
var imagepath = require('../backendPath.js').imagepath

const styles = {
  appbar: {
  	backgroundColor: '#3A9D23',
  	position: 'fixed',
  },
  img: {
  	height: '50px',
  },
  lien: {
  	marginLeft: 'auto',
  	marginRight: 'auto',
    textDecoration: 'none',
  },
};

class Header extends React.Component {
	state = {
		left: false,			//drawer visible
		connected: false,		//user connected
		numRequestGarden: 0,	//users requests on gardens from other users
		numMessages: 0,			//system messages 
		photoLink: '',			//profile image
		accountType: 'user',	//profile type
		user: ''
	};
	
  constructor(props) {
      super(props);
  }
  componentDidMount(){
	  if(!this.props.connected){
	  this.checkLogin();		  
	  }

  }
  componentDidUpdate(){	  
	  if(this.props.connected!=this.state.connected){
		console.log("component did update, props.connected: "+this.props.connected+" this.state.connected: "+this.state.connected);
		this.checkLogin();	
		console.log(this.props);		
	  }

  }
  
  getProfilePhoto(email){
	fetch(path+'/getPhoto.php?email='+email, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			if(data.info!="notconnected"){
				console.log("setting photo");
				this.setState({photoLink: data.photo});
				this.props.dispatch({ type: 'SETPHOTO', value: data.photo});
			}
	}.bind(this))
	.catch(function(error) {
		alert(error);
	}); 
  }
  
  checkLogin(){
	console.log("check login...");
	fetch(path+'/getInfoConnected.php', {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			if(data.Reponse!="Veillez vous connecte"){
				console.log(data.info[0]);
				this.setState({connected: true})
				this.props.dispatch({ type: 'CONNECT' });
				this.props.dispatch({ type: 'SETPHOTO', value: data.info[0].photo});
				this.props.dispatch({ type: 'SETDESCRIPTION', value: data.info[0].description});
				this.props.dispatch({ type: 'SETNOM', value: data.info[0].nom});
				this.props.dispatch({ type: 'SETPRENOM', value: data.info[0].prenom});
				this.setState({photoLink: data.info[0].photo});
				console.log(this.props);
			} else {
				console.log("NOT CONNECTED");
			}
	}.bind(this))
	.catch(function(error) {
		console.log(error);
	}); 
  }
  
  tryLogout(){
	console.log("logging out...");
	fetch(path+'/Deconnexion.php', {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			if(data.Reponse=="Connexion inexistante" || data.Reponse=="Déconnexion Effectuer"){
				this.setState({connected: false})
				this.props.dispatch({ type: 'DISCONNECT' });
				this.props.history.push('/');   
			}
	}.bind(this))
	.catch(function(error) {
		console.log(error);
	}); 
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const drawer = (
      <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
          <div className={classes.list}>
              <List>
                <Link to="/events" style={styles.lien}>
                  <ListItem button>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Événements" />
                  </ListItem>
                </Link>

                <Link to="/profil" style={styles.lien}>
                  <ListItem button>
                    <ListItemIcon>
                      <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Profil" />
                  </ListItem>
                </Link>

                <Link to="/search_garden" style={styles.lien}>
                  <ListItem button>
                    <ListItemIcon>
                      <Search />
                    </ListItemIcon>
                    <ListItemText inset primary="Chercher Jardin" />
                  </ListItem>
                </Link>
                <Link to="/accueilUser" style={styles.lien}>
                  <ListItem button>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Accueil" />
                  </ListItem>
                </Link> 
              </List>
            </div>
          </div>
        </Drawer>
    );

    return (
      <AppBar position="static" style = {styles.appbar}>
        <Toolbar>
          <IconButton
              color="contrast"
              aria-label="open drawer"
              onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
          </IconButton>	
		  
          <Link to="/" style={styles.lien}><img src={imagepath+'/images/logo.png'} style={styles.img}/></Link>
			{this.state.connected?(this.state.photoLink==''?(<MenuAccount logout={this.tryLogout.bind(this)}><FaceIcon /></MenuAccount>):(<MenuAccount logout={this.tryLogout.bind(this)}><Avatar src={imagepath+this.state.photoLink} /></MenuAccount>)):( 
			  <Button
								component={Link}
				  color="contrast"
				  to="/signin"
							  >
								{'Connexion'}
			</Button>)}
			
        </Toolbar>
        {drawer}
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
	connected: state.connected,
	photo: state.photoLink,
  };
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Header)));
