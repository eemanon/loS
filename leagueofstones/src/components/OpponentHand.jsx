import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia, CardTitle } from 'material-ui/Card';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
		width: '60%',
		margin: 'auto'
	},
	img: {
		height: '10vh'
	}
}

class OpponentHand extends React.Component {

	render(){
		let cards = [...Array(this.props.value||0)].map((v,i)=>i)
		return(
			<Grid container spacing={24} style={styles.container}>
				{cards.map((item)=>(
					<Grid item xs={2} sm={1}>

							<img style = {styles.img} src = {process.env.PUBLIC_URL+"/images/card_hidden.png"} />

					</Grid>
				))}
			</Grid>
		);
	}

}

export default OpponentHand;