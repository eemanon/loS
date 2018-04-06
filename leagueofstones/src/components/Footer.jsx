import React from 'react';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme =>({
	paper: {
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
  title: {
	  fontSize: '2rem'
  },
  footer: {
    backgroundColor: '#565656',
    height: '50px',
	marginTop: '50px',
	textAlign: 'center'
  },
});
	
class Footer extends React.Component {
  state = 
  {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
   
  handleClickRules = () => 
  {
    <a href="Rules.jsx" ></a>
  }
  
   render() {
	   
    const { classes } = this.props;
      return (
		<footer className={classes.footer}>
			 <Button onClick={this.handleOpen}>Mentions Legales</Button>
			 <Button onClick={this.handleClickRules}>Regles du Jeu</Button>
			<Modal
			  open={this.state.open}
			  onClose={this.handleClose}
			>
			  <div className={classes.paper}>
				<Typography variant="title" className={classes.title}>
				  Mentions légales
				</Typography>
				<Typography variant="subheading" id="simple-modal-description">
<p>Vous êtes actuellement connecté au Site “caillou adorable”, ci-après : le Site. </p>

<p>L’objectif principal du Site est la mise en relation entre :
	<ul>
		<li>les personnes qui ne possèdent pas de jardin souhaitant jardinier (les jardiniers) et ;</li>
		<li>les personnes, entreprises ou collectivités propriétaires d’un terrain ou un jardin inutilisé (les propriétaires). </li>
	</ul>
</p>
<p>
	<h2>Editeur du Site et coordonnées</h2>

	L’éditeur du Site est Monsieur Schleu. <br/>

	<h3>Adresse</h3>
	12 Rue de la Rock<br/>
	31000 Toulouse<br/>
	<h3>Courriel</h3>
	amelioretavie@mail.com<br/>
	<h3>Téléphone</h3>	
	11 11 22 22 11
</p>
<p>
	L’hébergeur du Site :

	Ce Site est hébergé par moi 
</p>
<p>
<h2>Déclaration CNIL</h2>

Conformément à la loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés modifiée, les traitements de fichiers de données personnelles mis en œuvre au travers de ce Site a fait l’objet d’une déclaration à la Commission Nationale de l’Informatique et des Libertés (CNIL), qui en a délivré récépissé sous le numéro :  (en cours)
</p>
<p>
	<h2>Données Personnelles </h2>

	Les données personnelles que nous amelioreons être amenés à recueillir sont exclusivement destinées à caillou adorable pour vous permettre de profiter des Services offerts par le Site. Aucune information personnelle vous concernant n'est cédée à des tiers ou utilisée à des fins non prévues sans votre autorisation préalable.
	Conformément à la loi n° 78-17 du 6 janvier 1978 modifiée, vous disposez d’un droit d’accès, de modification, de rectification et de suppression des données personnelles que nous amelioreons être amenés à recueillir.
</p>
<p>
	Pour l’exercer, adressez-vous à :<br />
	Adam et Eve
	12 Rue de la Rock<br/>
	31000 Toulouse<br/>

	amelioretavie@mail.com<br/>
	11 11 22 22 11<br/>

</p>
<p>
	<h2>Mise à jour</h2>

caillou adorable se réserve le droit de mettre à jour la présente notice légale à tout moment. 
caillou adorable vous invite les utilisateurs à viSiter cette page lors de chaque consultation du Site afin d’en prendre connaissance.

</p>
				</Typography>
			  </div>
			</Modal>
		</footer>
      );
   }
}

export default withStyles(styles)(Footer);