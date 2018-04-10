import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import PlayerLifePoints from './PlayerLifePoints';
import PlayerHand from './PlayerHand';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	}
}

class PlayerSide extends React.Component {
	render(){
		return(
			<Grid container spacing={24} style={styles.container}>
				<PlayerLifePoints value={this.props.value.playerLifePoints}/>
				<PlayerHand value={this.props.value.cards}/>
				<Grid item xs={12}>{this.props.value.name}</Grid>
			</Grid>
		);
	}

}

export default PlayerSide;