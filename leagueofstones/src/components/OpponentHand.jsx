import React from 'react';
import Grid from 'material-ui/Grid';

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
							<img style = {styles.img} src = {process.env.PUBLIC_URL+"/images/card_hidden.png"} alt="hiddencard" />
					</Grid>
				))}
			</Grid>
		);
	}

}

export default OpponentHand;