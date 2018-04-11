import React from 'react';
import Grid from 'material-ui/Grid';
import MyCard from './MyCard';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	},
}

class PlayerHand extends React.Component {

	render(){
		return(
			<Grid container spacing={24} style={styles.container}>
				{this.props.value.map((item,index)=>(
					<Grid item xs={6} sm={3}>
						<MyCard value={item} playCard={this.props.playCard} pos={"playerhand"}/>
					</Grid>
				))}
			</Grid>
		);
	}

}

export default PlayerHand;