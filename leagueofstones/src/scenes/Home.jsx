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

import Card, { CardActions, CardContent } from 'material-ui/Card';

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
	
	}
};

class Home extends React.Component {
	constructor(props) {
      super(props);
  }
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
	handleChange() {
		console.log("test");
	};
	
	render() {
		const { classes } = this.props;
		return (
			<Grid container spacing={24} alignItems="stretch" style={styles.container}>
				<Grid item xs={12} sm={6}>
					<Card  style={styles.card}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
					</Card>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Card>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
					</Card>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Card>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
					</Card>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Card>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						<Button onClick={this.handleClickOpen}>{this.props.buttontext}</Button>
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
