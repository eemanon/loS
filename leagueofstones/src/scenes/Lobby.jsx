import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CompareArrowsIcon from 'material-ui-icons/CompareArrows';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import List, { 
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText, } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import axios from 'axios';


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
	state = {
				user: '',
				connected: false,
				userlist: [],
				requestlist: [],
				useractive: false,
				waitforrequests: false,
				initiallyRetrieved: false
	}
	componentWillUnmount(){
		console.log("[lobby]\tunmounting")
		clearInterval(this.timerID)
	}
	componentDidUpdate(){
		console.log("[lobby]\t\tcomponent update")
		if(this.props.token!=="" && !this.state.initiallyRetrieved){
			console.log("[Lobby]\t\tgetting List first time")
			this.updateUserList()
			this.setState({initiallyRetrieved: true})
		}
		if(this.props.waitforrequests){
			console.log("[lobby]\t\ttimerSet")
			this.setupTimer();
			console.log("[lobby]\t\ttimer started")
			this.setState({useractive: true});
			this.props.dispatch({ type: 'SETREQUESTWAITINACTIVE' }); //because we only have to do this once :) 
		}
		if(this.props.connected && !this.state.connected){
			console.log("[lobby]\t\tuser connected")
			this.setState({connected: true});
		}
	}
	
	setupTimer = () => {
		this.timerID = setInterval(
		  () => this.tick(),
		  2000
		);
	}
	tick() {
		if(this.props.useractive){
			console.log("tick");
			clearInterval(this.timerID);
			//checking si on a une nouvelle demande de match OU SI UNE DEMANDE A ETE ACCEPTE
			let url = path+'/matchmaking/participate';
			axios.get(url, {params:{
			token: this.props.token
		}})
					.then(res => {
					let data = res.data
					if(data.status==="ok"){
						this.setState({requestlist: data.data.request});
						if(data.data.hasOwnProperty('match')){
							//Demande accepté!
							this.props.dispatch({ type: 'SETUSERINACTIVE' });	//arreter d'interroger le serveur avec participate and getall
							//necessité de push la route de la composition du deck
							localStorage.setItem('status','matched');
							this.props.history.push(process.env.PUBLIC_URL+'/composerDeck');
						}
					} else {
						alert ("action failed. "+data.message);
					}
			
			});
				//checking for newly connected users
			let url2 = path+'/matchmaking/getAll';
			axios.get(url2, {params:{
			token: this.props.token
		}})
					.then(res => {
					let data = res.data
					if(data.status==="ok"){
						this.setState({userlist: data.data});
					} else {
						alert ("action failed. "+data.message);
					}	
			}); 
		}
		this.setupTimer();
	}
	
	updateUserList = () =>{
		console.log("[lobby]\t\tUpdate List")
		console.log("[Lobby]\ttoken: "+this.props.token)
		this.setState({connected: true});
		//load list of users.
		let url = path+'/matchmaking/getAll';
		axios.get(url, {params:{
			token: this.props.token
		}})
				.then(res => {
				let data = res.data
				if(data.status==="ok"){
					console.log("[Lobby] ok "+data)
					this.setState({userlist: data.data});
					console.log(this.state);
				} else {
					console.log("[Lobby]\terror: "+data.message);
				}
		});
	}
	componentDidMount(){
		console.log("[Lobby]\tmounted")
		if(this.props.token==="")	
			console.log("[Lobby]\tno valid token yet")
		else{
			this.updateUserList()
			this.setState({initiallyRetrieved: true})
		}
	}
  
  matchmake = key => () =>{//A QUOI SERT CA?
	console.log(key);
	let url = path+'/matchmaking/request?matchmakingId='+key;
	axios.get(url,{params:{
			token: this.props.token
		}})
			.then(res => {
			let data = res.data	
			if(data.status==="ok"){
				console.log(data)
			} else {
				alert ("action failed. "+data.message);
			}
	});
  }
  
  acceptRequest = key => () =>{
	console.log("request accepting...");
	let url = path+'/matchmaking/acceptRequest?matchmakingId='+key;
	axios.get(url, {params:{
			token: this.props.token
		}})
		.then(res => {
		let data = res.data	
		if(data.status==="ok"){
			console.log(data);
			this.props.dispatch({ type: 'SETUSERINACTIVE' });	//arreter d'interroger le serveur avec participate and getall
			//necessité de push la route de la composition du deck
			this.props.history.push(process.env.PUBLIC_URL+'/composerDeck');  
		} else {
			alert ("action failed. "+data.message);
		}
	});
  }
  
  render() {
		const { classes } = this.props;
		const playerMessage = (<Card>Ces joueurs veulent jouer avec vous: Veuillez selectionner un pour accepter sa demande.</Card>);
		const usersOnline = (
			<div>
  <Card>Voila les utilisateurs connectés actuellement. Veuillez selectionner un pour lui demander en match</Card><Card>
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
					</List>
				</Card>
				{this.state.requestlist.length>0?playerMessage:""}<Card>
					<List>{this.state.requestlist.map(request =>(<div>
						<ListItem>
							<ListItemText
							  primary={request.name}
							/>
							<ListItemSecondaryAction>
							  <IconButton aria-label="matchmaking" onClick={this.acceptRequest(request.matchmakingId)}>
								<ThumbUpIcon />
							  </IconButton>
							</ListItemSecondaryAction>
						  </ListItem><Divider /></div>
					))}
					</List>
				</Card>
			</div>
		);
		return (
		<Card>
			{this.state.connected?(usersOnline):"Veuillez vous connecter svp"}
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
	useractive: state.useractive,
	waitforrequests: state.waitforrequests,
	token: state.token
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Lobby));