import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { connect } from 'react-redux';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

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
	video:{
		top: '10%',
		position: 'fixed',
		width: '100%',
	}
};

class Home extends React.Component {
	constructor(props) {
      super(props);
  }
  state = {
    open: false,
	video: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
	this.setState({ video: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
	handleChange() {
		console.log("test");
	};
  togglevid = () => {
	  let vid = !this.state.video;
	  this.setState({video: vid});
  }
  storage =() => {
	  localStorage.setItem('hell', "mammamia")
  }
  recover = () => {
	  alert(localStorage.getItem('hell'));
  }
	
	render() {
		const lilvid = (<video width="960" height="540" autoPlay style = {styles.video} onClick = {this.togglevid}>
			  <source src={process.env.PUBLIC_URL+"/videos/victory.webm"}></source>
			  Your browser does not support the video tag.
			</video>);
		const { classes } = this.props;
		return (
			<Grid container spacing={24} alignItems="stretch" style={styles.container}>
				{this.state.video?lilvid:""}
				<Grid item xs={12} sm={6}>
					<Card  style={styles.card}>
					<CardMedia
						image={process.env.PUBLIC_URL+"/images/moelen.jpg"}
						title="Présentation"
						style={styles.media}
					  />
					  <CardContent>
						Little Caillou just one our stony contest! Read more on stonesforstone.rs!

						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Card>
					<CardMedia
						image={process.env.PUBLIC_URL+"/images/7360.jpg"}
						title="Présentation"
						style={styles.media}
					  /><CardContent>
						A community of many many stoner awaits YOU! Can YOU become the next ROCK? Or are you not solid enough!?  Prove yourself in this rocky adventure!

						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Card>
					<CardMedia
						image={process.env.PUBLIC_URL+"/images/cropped_1-stone-wall-iStock.jpg"}
						title="Présentation"
						style={styles.media}
					  /><CardContent>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Card>
										<CardMedia
						image={process.env.PUBLIC_URL+"/images/logo.png"}
						title="logo"
						style={styles.media}
					  /><CardContent>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
						</CardContent>
						<Button onClick={this.handleClickOpen}>Click me</Button><Button onClick={this.togglevid}>Check it out!</Button>
							<Button onClick={this.recover}>rec</Button>
							<Button onClick={this.storage}>store</Button>

						<Dialog
						  open={this.state.open}
						  onClose={this.handleClose}
						  aria-labelledby="alert-dialog-title"
						  aria-describedby="alert-dialog-description"
						>
						  <DialogTitle>Salut la super equipe</DialogTitle>
						  <DialogContent>
							<DialogContentText>
							  Make le Mirail Great Again!
							</DialogContentText>
						  </DialogContent>
						  <DialogActions>
							<Button onClick={this.handleClose} color="primary">
							  Disagree
							</Button>
							<Button onClick={this.handleClose} color="primary" autoFocus>
							  Agree
							</Button>
						  </DialogActions>
						</Dialog>
					</Card>
				</Grid>
			</Grid>
		);
   	}
}

Home.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);
