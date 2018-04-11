import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import LifePoints from './LifePoints';
import PlayerHand from './PlayerHand';
import Board from './Board';
import Button from 'material-ui/Button';

const styles = {
	container: {
	},
	myturn: {
		backgroundColor:'lightgreen'
	},
	notmyturn: {
		backgroundColor:'white'
	},
	button: {
		float: 'right',
		backgroundColor: '#66ff66',
		marginBottom: '10px'
	},
	img: {
		width: '100%'
	}
}

class PlayerSide extends React.Component {	
	render(){
		console.log(this.props.value.board)
		return(
			<div>
				<Grid container spacing={24}>
					<Grid item xs={12} style={this.props.value.turn?styles.myturn:styles.notmyturn}>
						<Grid container spacing={24} style={styles.container}>
							<Grid item xs={1}>
								<LifePoints value={this.props.value.playerLifePoints}/>
							</Grid>
							<Grid item xs={9}>
								<Board value={this.props.value.board} setSelectedAttacker={this.props.setSelectedAttacker} pos={"board"} />
							</Grid>
							<Grid item xs={2}>
								<Button style = {styles.button} onClick={this.props.finirTour}>Finir Tour </Button>
								<img style = {styles.img} src = {process.env.PUBLIC_URL+"/images/cards.png"} onClick={this.props.piocherCarte} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<PlayerHand value={this.props.value.hand} playCard={this.props.playCard} />
					</Grid>
				</Grid>
			</div>
		);
	}

}

export default PlayerSide;