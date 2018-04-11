import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import HighlightOffIcon from 'material-ui-icons/HighlightOff';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import Checkbox from 'material-ui/Checkbox';


var path = require('../../backendPath.js').backendpath

const styles = {
  root: {
    display: 'flex',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  listText: {
	  textAlign: 'left',
  }
};

class MenuListComposition extends React.Component {
  state = {
    open: false,
	useractive: false,
	username: '',
	waitforrequests: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  goTo = (link) => {
	this.props.history.push('/'+link);
	this.handleClose();
  }
  componentDidMount(){
	  if(localStorage.getItem('status')==='visible') 
		  this.setState({useractive : true})
  }
  handleToggle = () => {
	  if(this.state.useractive){
		;//on sait pas si cette fonction est implementé coté serveur xD
		//this.setState({useractive:false});
		//this.props.dispatch({ type: 'SETUSERINACTIVE' });
	  } else {
		console.log("adding you to the list of players...")
		console.log(this);
		let url = path+'/matchmaking/participate';
		console.log(url);
		fetch(url, {credentials: 'include', method: 'get', accept: 'application/json'})
			.then(function(resp){return resp.json()})
			.then(function(data) {
				console.log(data);
				if(data.status==="ok"){
					console.log("positive response...");
					this.setState({useractive:true});  
					this.props.dispatch({ type: 'SETUSERACTIVE' });
					this.props.dispatch({ type: 'SETREQUESTWAITACTIVE' });
					localStorage.setItem('status', 'visible')
				} else {
					alert ("action failed. "+data.message);
					this.handleRequestCloseDialog();
				}
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		}); 
	  }
  }
  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            <Button
              aria-owns={open ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
			{this.props.children}
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
					<MenuItem>
						  <ListItemText className={classes.listText} primary={this.props.userConnected} />
					</MenuItem>
					<MenuItem onClick={this.handleToggle}><ListItemIcon className={classes.icon}>
						<Checkbox
							checked={this.state.useractive}
							tabIndex={-1}
							disableRipple
						  />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Je cherche un match!" />
					</MenuItem>
					<MenuItem onClick={this.props.deleteAccount}><ListItemIcon className={classes.icon}>
						<DeleteForeverIcon />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Supprimer Compte" />
					</MenuItem>
					<MenuItem onClick={this.props.logout}><ListItemIcon className={classes.icon}>
						<HighlightOffIcon />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Logout" />
					</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
		useractive : state.useractive,
		user : state.username,		
		waitforrequests: state.waitforrequests
  };
}


export default withRouter(withStyles(styles)(connect(mapStateToProps)(MenuListComposition)));