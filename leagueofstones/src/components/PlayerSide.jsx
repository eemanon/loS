import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import PlayerLifePoints from './PlayerLifePoints'

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
				<Grid item xs={12}>Cartes</Grid>
			</Grid>
		);
	}

}

export default PlayerSide;