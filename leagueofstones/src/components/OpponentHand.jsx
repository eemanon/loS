import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	},
}

class OpponentHand extends React.Component {

	render(){
		return(
			<Grid item xs={1}></Grid>
		);
	}

}

export default OpponentHand;