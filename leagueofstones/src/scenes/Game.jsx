import React from 'react';
import { connect } from 'react-redux';
import OpponentSide from '../components/OpponentSide';
import PlayerSide from '../components/PlayerSide';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles';

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
}

class Game extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
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

	componentDidMount(){
		let url = path+"/match/getMatch";
		fetch(url, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			console.log(data);
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
				//alert ("action failed. "+data.message);
			}
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		}); 
	}

	render(){
		return (
			<Grid container spacing={24} style={styles.container}>
				<Grid item xs={12}>
					<OpponentSide value={this.state.opponent}/>
				</Grid>
				<Grid item xs={12} style={styles.divider}>
				</Grid>
				<Grid item xs={12}>
					<PlayerSide  value={this.state.player}/>	
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
  };
}


export default connect(mapStateToProps)(Game) ;