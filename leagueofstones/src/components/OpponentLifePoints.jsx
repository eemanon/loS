import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	},
	heart: {
    	fontFamily: 'impact',
    	fontSize: '20px',
    	textAlign: 'center',
    	color: 'white',
		backgroundImage: 'url('+process.env.PUBLIC_URL+'/images/heart.png'+')',
    	backgroundRepeat: 'no-repeat',
    	backgroundSize: '100% 100%',
	}
}

class OpponentLifePoints extends React.Component {

	render(){
		return(
			<Grid item xs={1} style={styles.heart}>{this.props.value}</Grid>
		);
	}

}

export default OpponentLifePoints;