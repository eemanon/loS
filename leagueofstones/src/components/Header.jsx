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
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import axios from 'axios';


import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

var path = require('../backendPath.js').backendpath


const styles = {
  appbar: {
  	backgroundColor: '#565656',
  	position: 'fixed',
  },
  img: {
  	height: '50px',
	 position: 'fixed',
     left: '50%',
     transform: 'translate(-50%, -50%)',
  },
  lien: {
  	marginLeft: 'auto',
  	marginRight: 'auto',
  },
};

class Header extends React.Component {
	state = {
		connected: false,		//user connected
		user: '',
		email: '',
		openDialog: false,
		password: '',
	};
	
  constructor(props) {
      super(props);
  }
  componentDidMount(){
	  //check if there is local storage data 
	  console.log("[header]\theader was just mounted!")
	  if(localStorage.getItem('user') != null){
			console.log("[header]\tuser retrieved, setting store")
			console.log("[header]\ttoken: "+localStorage.getItem('token'))
		  	this.props.dispatch({ type: 'CONNECT' });
			this.props.dispatch({ type: 'SETUSER', value: localStorage.getItem('user')});
			this.props.dispatch({ type: 'SETTOKEN', value: localStorage.getItem('token')});
			this.props.dispatch({ type: 'SETEMAIL', value: localStorage.getItem('mail')});
			//has the user last checked to be visible for others?
			if(localStorage.getItem('status')==='visible'){
					this.props.history.push(process.env.PUBLIC_URL+'/accueilUser');
					this.props.dispatch({ type: 'SETUSERACTIVE' });
					this.props.dispatch({ type: 'SETREQUESTWAITACTIVE' });
			}
			//has the user just found a match before leaving? if yes, forward to deck selection
			if(localStorage.getItem('status')==='matched')
				this.props.history.push(process.env.PUBLIC_URL+'/composerDeck');
			//has the user submitted a deck before leaving?
			if(localStorage.getItem('status')==='deckcomposed'){
				this.props.history.push(process.env.PUBLIC_URL+'/composerDeck');
			}
			//has the user had a match started before leaving? if yes, forward to game
			if(localStorage.getItem('status')==='game'){
				//this.props.history.push(process.env.PUBLIC_URL+'/game');
			}			
	  }
  }
  componentDidUpdate(){	  
	console.log("[header]	update")
	if(this.props.connected && !this.state.connected){
		console.log("[header]	connecting user")
		this.setState({connected: true});
		this.setState({user: this.props.user});
		this.setState({email: this.props.email});
	}
  }
  openDialogdeleteAccount = () => {
	  console.log("[header] Delete Dialog opened")
	this.setState({ openDialog: true });
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  
  deleteAccount = () => {
	  console.log("deleting your account...")
	  console.log("mail: "+this.props.email)
	  let url = path+'/users/unsubscribe?email='+this.props.email+'&password='+this.state.password;
	  console.log(url);
	  axios.get(url, {params:{
			token: this.props.token
		}})
			.then(res => {
			let data = res.data
			if(data.status==="ok"){
				console.log("positive response...");
				this.props.dispatch({ type: 'DISCONNECT' });
				this.props.history.push(process.env.PUBLIC_URL+'/');   
				this.handleRequestCloseDialog();
				this.setState({connected: false});
				alert("Ton compte a été supprimé. Adieu! :'(")
				localStorage.clear();
			} else {
				alert ("action failed. "+data.message);
				this.handleRequestCloseDialog();
			}
		});
  }
  tryLogout(){
	console.log("[Header]\tlogging out...");
	let url = path+'/users/disconnect';
	axios.get(url, {params:{
			token: this.props.token
		}})
		.then(res => {
		let data = res.data	
		if(data.status==="ok"){
			console.log("positive response...");
			this.props.dispatch({ type: 'DISCONNECT' });
			this.props.dispatch({ type: 'SETUSERINACTIVE' });
			console.log("setting user inactive"+this.props.useractive);
			localStorage.clear();
			this.props.history.push(process.env.PUBLIC_URL+'/');   
			this.setState({connected: false})
		}	
	});
  }
  
  handleRequestCloseDialog = () => {
    this.setState({ openDialog: false });
  };
  
  render() {
    const { classes } = this.props;
	const deleteAccountDialog = (
      <Dialog open={this.state.openDialog} onClose={this.handleRequestCloseDialog}>
          <DialogTitle>Supprimer mon compte</DialogTitle>
          <DialogContent>
            <DialogContentText>
              t'es sur de cette action? Tu ne pourras plus jouer aux cailloux!
            </DialogContentText>
				  <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Confirme cette action avec ton mot de passe"
                type="password"
                name="password"
                onChange={this.handleChange('password')}
                value={this.state.password}
                fullWidth
                required />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestCloseDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={this.deleteAccount} color="primary">
              Oui, Supprimer mon Compte
            </Button>
          </DialogActions>
        </Dialog>
    )
    return (
      <AppBar position="static" style = {styles.appbar}>
        <Toolbar>
		  
          <Link to="/" style={styles.lien}><img src={process.env.PUBLIC_URL+'/images/logo.png'} style={styles.img}/></Link>
			{this.state.connected?(<MenuAccount userConnected = {this.props.user} logout={this.tryLogout.bind(this)} deleteAccount={this.openDialogdeleteAccount.bind(this)}><FaceIcon /></MenuAccount>):( 
			  <Button
								component={Link}
				  color="contrast"
			to={process.env.PUBLIC_URL+"/signin"}
							  >
								{'Connexion'}
			</Button>)}
			
        </Toolbar>
		{deleteAccountDialog}
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
	connected: state.connected,
	email: state.email,
	token: state.token
  };
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Header)));
