import React from 'react';
import { connect } from 'react-redux';
import OpponentSide from '../components/OpponentSide';
import PlayerSide from '../components/PlayerSide';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
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
	button: {
		float: 'right',
		backgroundColor: '#66ff66',
	}
}

class Game extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
			player: {
				playerLifePoints: 150				
			},
			opponent: {
				opponentLifePoints: 150
			}
		}
	}

	componentDidMount(){
		let url = path+"/match/getMatch";
		fetch(url, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			console.log(data);
			/*if(data.status==="ok"){
				this.setState({cardlist:data.data});
			} else {
				alert ("action failed. "+data.message);
			}*/
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		}); 
	}

	render(){
		return (
			<Grid container spacing={24} style={styles.container}>
				<OpponentSide value={this.state.opponent}/>
				<Grid item xs={12} style={styles.divider}>
					<Button variant="raised" style={styles.button}>Finir mon tour</Button>
				</Grid>
				<PlayerSide  value={this.state.player}/>	
			</Grid>
		);
	}

}

export default Game;