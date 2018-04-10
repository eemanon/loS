import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import OpponentLifePoints from './OpponentLifePoints';
import OpponentHand from './OpponentHand';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	}
}

class OpponentSide extends React.Component {

	render(){
		return(
			<Grid container spacing={24} style={styles.container}>
				<OpponentLifePoints value={this.props.value.opponentLifePoints}/>
				<OpponentHand value={this.props.value.cards}/>
				<Grid item xs={12}>{this.props.value.name}</Grid>
			</Grid>
		);
	}

}

export default OpponentSide;