import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';



const styles = theme =>
({
	paper: 
	{
		position: 'absolute',
		width: '80%',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		top: '7%',
		left: '2%',
		height: '400px',
		overflow: 'scroll'
	},
	title: *
	{
	  fontSize: '2rem'
	}
	
});


class Rules extends React.Component 
{
	constructor(props) 
	{
		super(props);
	}
	state = 
	{
		open: false,
	};
	
	handleClickOpen = () => 
	{
		this.setState({ open: true });
    };
	
	handleClose = () => 
	{
		this.setState({ open: false });
	};
	
	handleChange()
	{
		console.log("test");
	};
	
	render() 
	{
		const { classes } = this.props;
		return 
		(
			<div className={classes.paper}>
				<Typography variant="title" className={classes.title}>
				  REGLES DU JEU
				</Typography>
				
				<Typography variant="subheading" id="simple-modal-description">
		
					<h3 id ="butDuJeu">But du jeu</h3> 
					
						<p> Deux joueurs s’affrontent en possèdant un deck de 20 cartes et 150 points de vie. Chaque carte décrit un champion avec une statistique d’attaque et une de défense.</p>
						<p>Les joueurs jouent chacun leur tour dans l’objectif de réduire les points de vie de l’adversaire à 0 pour gagner la partie </p>
						</br>
						</br>
						
					<h3 id ="principeDuJeu">Principes de jeu</h3> 
					
						<p> Au début de la partie, les deux joueurs piochent 4 cartes. Durant son tour, un joueur peut effectuer 3 actions dans l’ordre qu’il le souhaite : <p>
							<ul> 
								<li>Piocher une carte (une fois par tour)</li>
								<li>Poser une carte sur le plateau (au maximum 5 par joueur sur le plateau)</li>
								<li>Attaquer (une fois par carte sur le plateau)</li>
							</ul>
						</br>
						
						<p> Une carte posée sur le plateau durant ce tour ne pourra attaquer qu’au tour suivant. Au tour suivant la carte peut attaquer un monstre sur le plateau adverse. Résolution de l’attaque : </p>
						<p>Si la valeur d’attaque de la carte qui attaque est supérieure à la valeur de défense de la carte adverse alors cette dernière est supprimée et la différence entre les deux valeurs de carte est retirée aux points de vie de l’adversaire. </p>
							<ul>
								<li>Si les deux cartes ont une attaque et une défense égales alors les deux cartes sont détruites. </li>
								<li>Si la valeur d’attaque est inférieure à la valeur de défense alors la carte attaquante est détruite.</li>
								<li>S’il n’y a aucune carte sur le plateau adverse alors la carte peut directement attaquer les points de vie de l’adversaire.</li>
							</ul>
							</br>
							
							<p>Une fois qu’une carte a attaqué, elle devra attendre le tour suivant pour attaquer de nouveau.</p>
				</Typography>
			</div>
		);
   	}
}

Rules.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Rules);
