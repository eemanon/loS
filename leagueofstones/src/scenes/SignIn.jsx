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
import { Link } from 'react-router-dom';

var path = require('../backendPath').backendpath


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
	textAlign: 'center'
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
      this.state = { email: '', password: '', checking: false };
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.setCharging = this.setCharging.bind(this);
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
  
  handleSubmit() {
		this.setCharging();
		fetch(path+'/users/connect?email='+this.state.email+'&password='+this.state.password, {
          method: 'GET',
		  mode: 'cors',
          headers: {
            Accept: 'application/json'
          },
          credentials: 'include'
        }).then(function(resp){return resp.json()})
				.then(function(data) {
				if (data.status==="ok"){
					this.props.dispatch({ type: 'CONNECT' });
					this.props.dispatch({ type: 'SETUSER', value: data.data.name});
					this.props.dispatch({ type: 'SETTOKEN', value: data.data.token});
					this.props.dispatch({ type: 'SETEMAIL', value: this.state.email});
					this.props.history.push('/accueilUser'); 
				} else if(data.message=="Already connected"){
					fetch(path+'/users/disconnect?email='+this.state.email+'&password='+this.state.password, {
					  method: 'GET',
					  mode: 'cors',
					  headers: {
						Accept: 'application/json'
					  },
					  credentials: 'include'
					}).then(function(resp){return resp.json()})
						.then(function(data) {
							if (data.status==="ok"){
								this.handleSubmit();
							}
					}.bind(this));
				} else {
					alert("Erreur. "+data.message);
					this.setCharging();
				}
				
			}.bind(this))
			.catch(function(error) {
				alert(error);
				this.setCharging();
			}); 
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
						  Login
					  </Typography>
					</div>
					<form className={classes.form} noValidate autoComplete="off">
						{this.state.checking?(<CircularProgress className={classes.progress} />):""}
					  <div>
						<TextField
						  required
						  fullWidth
						  id="email"
						  name="email"
						  label="Login"
						  placeholder="Ton email stp"
						  margin="normal"
						  onChange={this.handleChange('email')}
						  value={this.state.email}
						/>
					  </div>
					  <div>
						<TextField fullWidth
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
					  </div>
					  <div>
						<Button raised color="primary" className={classes.button} onClick={this.handleSubmit } >
						  Connexion
						</Button>
					  </div>
					</form>

					<div className={classes.links}>
						<Divider />
							  <Link to="/signup"><Button>
								Créer un compte
							  </Button></Link>
					  </div>
				  </Paper>
              </Grid>
            </Grid>
          </div>

      );
  }
}

function mapStateToProps(state) {
  return {
	connected: state.connected,
	user: state.user
  };
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(connect(mapStateToProps)(SignIn)));
