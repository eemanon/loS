import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent, CardMedia, CardTitle } from 'material-ui/Card';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	},
	lien: {
    	textDecoration: 'none',
    	color: 'inherit',
  	},
	root: {
		flexGrow: 1,
		marginTop: 30,
    },
	card: {
	
	},
	media: {
		height: '30vh',
    },
    attack: {
    	fontFamily: 'impact',
    	fontSize: '20px',
    	textAlign: 'center',
    	color: 'white',
    	backgroundImage: 'url('+process.env.PUBLIC_URL+'/images/stone.png'+')',
    	backgroundRepeat: 'no-repeat',
    	backgroundSize: '100% 100%',
    },
    defense: {
    	fontFamily: 'impact',
    	fontSize: '20px',
    	textAlign: 'center',
    	color: 'white',
    	backgroundImage: 'url('+process.env.PUBLIC_URL+'/images/shield.png'+')',
    	backgroundRepeat: 'no-repeat',
    	backgroundSize: '100% 100%',
    }
};

function MyCard(props){
	if (props.value != undefined) {
		var url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+props.value.key+"_0.jpg";
		return (
			<Card className="myCard">
				<CardMedia image={url} title={props.value.name} style={styles.media}>
				</CardMedia>
				<CardContent>
					<Grid container spacing={24} style={styles.container}>
						<Grid item xs={12}>{props.value.name}</Grid>
						<Grid item xs style={styles.attack}>{props.value.stats.attackdamage}</Grid>
						<Grid item xs style={styles.defense}>{props.value.stats.armor}</Grid>
					</Grid>
				</CardContent>
			</Card>
		);
	}else{
		return (<h1>"Oups"</h1>);
	}
}

export default MyCard;