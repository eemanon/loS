import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import { green, red } from 'material-ui/colors';
import {withRouter} from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';

import { connect } from 'react-redux';

import axios from 'axios';

var path = require('../backendPath.js').backendpath

const primary = green[500];
const accent = red['A200'];

const styles = theme => ({
  form: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: '100%',
	textAlign: 'center'
  }),

  container: theme.mixins.gutters({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    paddingRight: 0,
    paddingLeft: 0,
  }),

  mainGrid: theme.mixins.gutters({
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    margin: 0,
  }),

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  links: {
    width: '100%',
  },

  header: {
    width: '100%',
    backgroundColor: accent,
    padding: theme.spacing.unit * 1,
    margin: 0,
  }

});
class SignIn extends React.Component{
	state = {connected: false}

  constructor(props) {
      super(props);
      this.state = { pseudo: '', mail: '', password: '', checking: false };
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.setCharging = this.setCharging.bind(this);
	  this.validate = this.validate.bind(this);
  };
	
	handleChange = prop => event => {
	this.setState({ [prop]: event.target.value });

	};
	setCharging(){
	if(!this.state.checking)
		this.setState({ checking: true });
	else
		this.setState({ checking: false });	
	};
	validate(mail, user, password){
	  //validates the hell out of the data
	  return true;
	}
	
	handleSubmit() {
		this.setCharging();
		if(this.validate){
			let url = path+'/users/subscribe?email='+this.state.mail+'&password='+this.state.password+'&name='+this.state.pseudo;
			axios.get(url)
			.then(res => {
				let data = res.data
				if(data.status==='ok'){
					this.setCharging();
					alert("Utilisateur créé. Tu peux desormais te connecter.")
					this.props.history.push(process.env.PUBLIC_URL+'/');  
				} else {
					alert("ca n'a pas marché. "+data.message);
					this.setCharging();
				}							
			})
		} else {
			this.setCharging();
			alert("Please check that you enter an email, a password and a name");
		}	
	};


  render(){
      const { classes } = this.props;
      return(
		<div>
            <Grid container spacing={24} justify="center">
              <Grid item xs={12} sm={6}>
				  <Paper className={classes.container} elevation={4}>
					<div className={classes.header}>
					  <Typography type="headline" component="h3">
						  Inscription
					  </Typography>
					</div>
					<form className={classes.form} noValidate autoComplete="off">
						{this.state.checking?(<CircularProgress className={classes.progress} />):""}

						<TextField
						  required
						  fullWidth
						  id="pseudo"
						  name="pseudo"
						  label="Mon Pseudo"
						  placeholder="Mon Pseudo"
						  margin="normal"
						  onChange={this.handleChange('pseudo')}
						  value={this.state.pseudo}
						/>
						<TextField fullWidth
						  required
						  id="mail"
						  name="mail"
						  label="Mon adresse mail"
						  placeholder="Mon adresse mail"
						  onChange={this.handleChange('mail')}
						  value={this.state.mail}
						/>
						<TextField fullWidth
						  required
						  id="password"
						  name="password"
						  label="Password"
						  placeholder="Enter your password"
						  type="password"
						  autoComplete="current-password"
						  margin="normal"
						  onChange={this.handleChange('password')}
						  value={this.state.password}
						/>
					  <div>
						<Button raised color="primary" className={classes.button} onClick={this.handleSubmit } >
						  M'inscrire
						</Button>
					  </div>
					</form>
				  </Paper>
              </Grid>
            </Grid>
          </div>

      );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
