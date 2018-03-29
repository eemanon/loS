import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CompareArrowsIcon from 'material-ui-icons/CompareArrows';
import IconButton from 'material-ui/IconButton';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import List, { 
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText, } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';

var path = require('../backendPath').backendpath


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  card: {
	  margin: 20,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },  
})

class Lobby extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
				user: '',
				connected: false,
				userlist: []
			};
  }
  componentDidUpdate(){
	console.log("update lobby!")
	if(this.props.connected && !this.state.connected){
		console.log("omg it's connected!")
		this.setState({connected: true});
	}
  }
  componentDidMount(){
	if(this.props.connected && !this.state.connected){
		console.log("omg it's connected!")
		this.setState({connected: true});
		//load list of users.
		let url = path+'/matchmaking/getAll';
		fetch(url, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			console.log(data);
			if(data.status==="ok"){
				this.setState({userlist: data.data});
				console.log(this.state);
			} else {
				alert ("action failed. "+data.message);
			}
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		}); 
		
	} 
  }
  
  matchmake = key => () =>{
	  console.log(key);
  }
  
  render() {
		const { classes } = this.props;
		console.log(this.state.userlist);
		const items = (
			<List>{this.state.userlist.map(user =>(<div>
				<ListItem>
                    <ListItemText
                      primary={user.name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="matchmaking" onClick={this.matchmake(user.matchmakingId)}>
                        <CompareArrowsIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem><Divider /></div>
			))}
			</List>);
		return (
		<Card>
			{this.state.connected?items:"Veuillez vous connecter svp"}
		</Card>
		);
   	}
}

Lobby.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
	connected: state.connected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Lobby));