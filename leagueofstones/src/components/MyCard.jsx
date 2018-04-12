import React from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
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
	cardActive: {
		backgroundColor: 'yellow'
	},
	cardInActive: {
		backgroundColor: 'white'
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

class MyCard extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
				cardselected: false,
			};
	}
  
	cardAction = (key, pos) => {
		if(pos==="board"){
			let r = this.props.setSelectedAttacker(key);
			console.log("action is attack");
			if(r){
				if(this.state.cardselected)
					this.setState({cardselected: false});
				else
					this.setState({cardselected: true});
			}
			
		}
		if(pos==="playerhand"){
			this.props.playCard(key);
		}
		if(pos==="opponentboard"){
			console.log("attacked card chosen")
			this.props.setSelectedAttacked(key);
		}
	}
	render(){
		const props = this.props;
		if (props.value !== undefined) {
			var url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+props.value.key+"_0.jpg";
			return (
				<Card className="myCard" onClick={() => this.cardAction(props.value.key, props.pos)} style = {this.state.cardselected?styles.cardActive:styles.cardInActive}>
					<CardMedia image={url} title={props.value.name} style={styles.media}>
					</CardMedia>
					<CardContent>
						<Grid container spacing={24} style={styles.container}>
							<Grid item xs={12}>{props.value.name}</Grid>
							<Grid item xs style={styles.attack}>{Math.round(props.value.stats.attackdamage,1)}</Grid>
							<Grid item xs style={styles.defense}>{Math.round(props.value.stats.armor,1)}</Grid>
						</Grid>
					</CardContent>
				</Card>
			);
		}else{
			return (<h1>"Oups"</h1>);
		}
	}
}

export default MyCard;