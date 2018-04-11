import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import LifePoints from './LifePoints';
import OpponentHand from './OpponentHand';
import Board from './Board';



const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	},
	img: {
		width: '100%'
	},
	myturn: {
		backgroundColor:'lightgreen'
	},
	notmyturn: {
		backgroundColor:'white'
	},
}

class OpponentSide extends React.Component {

	render(){
		return(
			<Grid container spacing={24} style={this.props.value.turn?styles.myturn:styles.notmyturn}>
				<Grid item xs={2}>
					<img style = {styles.img} src = {process.env.PUBLIC_URL+"/images/cards.png"} />
				</Grid>
				<Grid item xs={9}>
					<Board value={this.props.value.board}/>
				</Grid>
				<Grid item xs={1}>
					<LifePoints value={this.props.value.opponentLifePoints}/>
				</Grid>
			</Grid>
		);
	}

}

export default OpponentSide;