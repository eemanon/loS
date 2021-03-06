import React from 'react';
import { connect } from 'react-redux';
import OpponentSide from '../components/OpponentSide';
import PlayerSide from '../components/PlayerSide';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles';
import axios from 'axios';


var path = require('../backendPath').backendpath;



const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	},
	divider: {
		height: '1px',
		backgroundColor: '#000000',
		padding: '0px',
	},
	video:{
		top: '10%',
		position: 'fixed',
		width: '100%',
	}
}

class Game extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
			waiting: false,
			tickWaiting: false,
			victory: false,
			currentlySelectedAttackCard: "",
			initiallyRetrieved: false,
			player: {
				name: "",
				playerLifePoints: 0,
				hand: [],
				deck:[],
				board: [],
				turn: false
			},
			opponent: {
				name: "",
				opponentLifePoints: 0,
				hand: 0,
				deck: 0,
				board: [],
				turn: false
			}
		}
	}
	//COMPONENT DID UPDATE AND REPLACE FETCH
	componentDidMount(){
		console.log("[Game]\tmounting")
		if(this.props.token==="")	
			console.log("[Lobby]\tno valid token yet")
		else{
			this.updateGame();
			this.setState({initiallyRetrieved: true})
			if(!this.state.player.turn){
				if(!this.state.waiting){
					console.log("start asking server continously");
					this.setState({waiting: true});
					this.setupTimer();
				}
			} else {
			console.log("[Game]\tit's your turn")
			}
		}
	}
	
	componentDidUpdate(){
		if(this.props.token!=="" && !this.state.initiallyRetrieved){
			console.log("[Lobby]\t\tgetting Game Info first time")
			this.updateGame()
			this.setState({initiallyRetrieved: true})
			if(!this.state.player.turn){
				if(!this.state.waiting){
					console.log("start asking server continously");
					this.setState({waiting: true});
					this.setupTimer();
				}
			} else {
			console.log("[Game]\tit's your turn")
			}
		}
	}

	componentWillUnmount(){
		console.log("[game]\tunmounting")
		clearInterval(this.timerID)
	}
	
	setupTimer = () => {
		this.timerID = setInterval(
		  () => this.tick(),
		  2000
		);
	}
	
	tick() {
		console.log("GameWaitingtick");
		console.log(this.state.player.turn);
		this.updateGame();
		clearInterval(this.timerID);
		if(!this.state.player.turn){
			console.log("still not your turn");
			this.setupTimer();
		} else {
			console.log("your turn now, timer stopped")
			this.setState({waiting: false})
		}
	}
	
	piocherCarte = () =>{
		console.log("pioching carte");
		if(this.state.player.turn){
			console.log("[Game]\tyour turn")
			let url = path+'/match/pickCard';
				axios.get(url,{params:{
			token: this.props.token
			}}).then(res => {
				let data = res.data;
					if(data.status==="ok"){
						console.log("positive response...");
						this.updateGame();
					} else {
						alert ("action failed. "+data.message);
						this.handleRequestCloseDialog();
					}
			});
		} else {
			console.log("not your turn.")
		}
		
	}
	
	finirTour = () =>{
		console.log("[Game]\tje finis mon tour")
		if(this.state.player.turn){
			console.log("your turn")
			let url = path+'/match/endTurn';
			axios.get(url,{params:{
			token: this.props.token
			}}).then(res => {
				let data = res.data;
					if(data.status==="ok"){
						console.log("positive response, updating game");
						this.setState({tickWaiting: true});
						this.updateGame();
						this.setState({waiting: true});
						this.tick()
					} else {
						alert ("action failed. "+data.message);
					}
			});
		} else {
			console.log("not your turn.")
		}
	}
	
	updateGame = () => {
		this.setState({updatePending: true})
		console.log("[Game] token: "+this.props.token)
		let url = path+"/match/getMatch";
		axios.get(url,{params:{
			token: this.props.token
			}}).then(res => {
				let data = res.data;
				if(data.status==="ok"){
					console.log(this.props.user);
					if(this.props.user===data.data.player1.name){
						this.setState({player:{name: data.data.player1.name,
											   playerLifePoints: data.data.player1.hp,
											   hand: data.data.player1.hand,
											   deck: data.data.player1.deck,
											   board: data.data.player1.board,
											   turn: data.data.player1.turn},
										opponent:{name: data.data.player2.name,
											   opponentLifePoints: data.data.player2.hp,
											   hand: data.data.player2.hand,
											   deck: data.data.player2.deck,
											   board: data.data.player2.board,
											   turn: data.data.player2.turn}
									});
					}else if(this.props.user===data.data.player2.name){
						this.setState({player:{name: data.data.player2.name,
											   playerLifePoints: data.data.player2.hp,
											   hand: data.data.player2.hand,
											   deck: data.data.player2.deck,
											   board: data.data.player2.board,
											   turn: data.data.player2.turn},
										opponent:{name: data.data.player1.name,
											   opponentLifePoints: data.data.player1.hp,
											   hand: data.data.player1.hand,
											   deck: data.data.player1.deck,
											   board: data.data.player1.board,
											   turn: data.data.player1.turn}	
									});				
					}
				} else {
					console.log("[Game]\tupdate failed. "+data.message);
				}
				console.log("[Game]\tchecking life points: "+this.state.opponent.opponentLifePoints)
				//I won :) 
				if(this.state.opponent.opponentLifePoints<=0.0){
					this.setState({victory: true});
					this.setState({tickWaiting: false});
					clearInterval(this.timerID);
				}
				//I lost :(
				else if(this.state.player.playerLifePoints<=0.0){
					this.setState({tickWaiting: false});
					clearInterval(this.timerID);
					alert("You lost. Shame on you")
					this.props.history.push(process.env.PUBLIC_URL+'/accueilUser');
					
				}				
				if(this.state.tickWaiting){
					this.setState({tickWaiting: false});
					this.tick()
				}
			
		});
	}
	
	playCard = (key) => {
		console.log("playing "+key);
		let url = path+'/match/playCard?card='+key;
		axios.get(url,{params:{
			token: this.props.token
			}}).then(res => {
				let data = res.data;
				if(data.status==="ok"){
					this.updateGame();
				} else {
					alert ("action failed. "+data.message);
				}
		});
	}
	
	setSelectedAttacker = (key) => {
		if (this.state.currentlySelectedAttackCard === ""){
			this.setState({currentlySelectedAttackCard: key});
			return true;
		}
		else if (this.state.currentlySelectedAttackCard === key){
			this.setState({currentlySelectedAttackCard: ""});
			return true;
		}
		else {
			alert("unselect you must, before chose another gladiator you can select!");
			return false;
		}
		console.log(key+ " has been set as selected attacker")
	}
	
	setSelectedAttacked = (key) => {
		//check if an attacker is picked.  If not, lament.
		if (this.state.currentlySelectedAttackCard!==""){
			let url = path+'/match/attack?card='+this.state.currentlySelectedAttackCard+"&ennemyCard="+key;
				axios.get(url,{params:{
				token: this.props.token
				}})
				.then(res => {
					let data = res.data	
					if(data.status==="ok"){
						this.updateGame();
					} else {
						alert ("action failed. "+data.message);
					}
				}); 	  
		} else {
			alert ("you must chose your champion before attacking this card!")
		}
	}
	
	attackPlayer = () => {
		console.log("attacking player at the heart...")
		if(this.state.currentlySelectedAttackCard!==""){
			let url = path+'/match/attackPlayer?card='+this.state.currentlySelectedAttackCard;
			axios.get(url,{params:{
			token: this.props.token
			}}).then(res => {
				let data = res.data;
					if(data.status==="ok"){
						this.updateGame();
					} else {
						alert ("action failed. "+data.message);
					}
			});  
		}
	}
	
	endMatch = () => {
		console.log("[Game] over");
		let url = path+'/match/finishMatch';
		axios.get(url,{params:{
			token: this.props.token
			}}).then(res => {
				let data = res.data;
				if(data.status==="ok"){
					console.log(data)
					this.props.history.push(process.env.PUBLIC_URL+'/accueilUser');
				} else {
					alert ("action failed. "+data.message);
				}
		});  		
	}
	
	togglevid = () => {
		this.setState({victory: false});
		this.endMatch();
	}
	
	render(){
		const lilvid = (<video width="960" height="540" autoPlay style = {styles.video} onClick = {this.togglevid}>
			  <source src={process.env.PUBLIC_URL+"/videos/victory.webm"}></source>
			  Your browser does not support the video tag.
			</video>);
		return (
			<Grid container spacing={24} style={styles.container}>
				<Grid item xs={12}>
					<OpponentSide value={this.state.opponent} setSelectedAttacked={this.setSelectedAttacked} attackPlayer={this.attackPlayer} />
				</Grid>
				<Grid item xs={12} style={styles.divider}>
				</Grid>
				{this.state.victory?lilvid:""}
				<Grid item xs={12}>
					<PlayerSide  playCard = {this.playCard} value={this.state.player} piocherCarte={this.piocherCarte} finirTour= {this.finirTour} setSelectedAttacker= {this.setSelectedAttacker} />	
				</Grid>
			</Grid>
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


export default connect(mapStateToProps)(Game) ;