import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import List, { 
  ListItem,
  ListItemSecondaryAction,
  ListItemText, } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import axios from 'axios';


var path = require('../backendPath.js').backendpath

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
		height: '70vh',
	},
	media: {
		height: '30vh',
    },
	button: {
		marginLeft:'auto',
		marginRight: 'auto',
	},
	list: {
		maxHeight: '52vh',
		overflow: 'auto'
	},
	list2: {
		maxHeight: '35vh',
		overflow: 'auto'
	},
	progress:{
		margin: 'auto'
	},
	dialog:{
		textAlign: 'center',
		overflow: 'hidden',
		minHeight: '150px'
	}
};

class DeckCreation extends React.Component {
  state = {
    open: false,
	connected: false,
	cardsRetrieved: false,
	cardsAvailable: [],
	cardsInDeck: [],
	deckStatus: 'nodeck'
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount(){
	if(this.props.token==="")	
		console.log("[DeckCreation]\tno valid token yet")
	else{
		this.retrieveCards()
	}
  }
  retrieveCards(){
	if((localStorage.getItem('status')!=='deckcomposed')){
		  console.log("not deck composed: "+localStorage.getItem('status'))

		  //load all cards 
		  let url = path+'/cards/getAll';
			axios.get(url, {params:{
					token: this.props.token
				}})
					.then(res => {
					let data = res.data
					console.log(data);
					if(data.status==="ok"){
						console.log("positive response...");
						this.setState({cardsAvailable:data.data});  
						this.props.dispatch({ type: 'SETUSERACTIVE' });
					} else {
						alert ("action failed. "+data.message);
						this.handleRequestCloseDialog();
					}
			})
		  //call /match/getMatch for whatever reason...
		  console.log(this.props.tokenN)
		  let url2 = path+'/match/getMatch';
						axios.get(url2, {params:{
					token: this.props.token
				}})
				.then(res => {
					let data = res.data
					console.log(data);
					if(data.status==="ok"){
						console.log("positive response...");
					} else {
						alert ("action failed. "+data.message);
					}
				})
	} else {
		this.tick()
	}
  }
	componentWillUnmount(){
		console.log("[DeckCreation]\tunmounting")
		clearInterval(this.timerID)
	}
	componentDidUpdate(){
	  console.log("[DeckCreation]\tupdated")
	  if(this.props.token!=="" && !this.state.cardsRetrieved){
		console.log("[DeckCreation]\twe have a token: "+this.props.token);
		console.log("[DeckCreation]\tRetrieving cards");
		this.retrieveCards();
		this.setState({cardsRetrieved: true});
	  }
	}
  
   removeCard = card => () => {
	  this.setState({
		  cardsAvailable: [...this.state.cardsAvailable, card]
	  });
	  this.setState(prevState => { // pass callback in setState to avoid race condition
			let newDeck = prevState.cardsInDeck.slice() //copy array from prevState
			newDeck.splice(card, 1) // remove element
			return {cardsInDeck: newDeck} // update state
    });
  } 
  setupTimer = () => {
	  	this.timerID = setInterval(
		  () => this.tick(),
		  3000
		);
  }
  
    tick() {
	console.log("tick");
	let url = path+'/match/getMatch'
	axios.get(url, {params:{
		token: this.props.token
	}})
	.then(res => {
		let data = res.data;
		if(data.status==="ok"){
				console.log(data);
				//if the match has begun, go to the game component
				//and change state deckStatus for doing so.
				if(data.data.status!=="Deck is pending")
					this.setState({deckStatus: "opponentready"})				
		} else {
			alert ("action failed. "+data.message);
			this.handleRequestCloseDialog();
		}
	})
	clearInterval(this.timerID);
	console.log("[DeckCreation]\tdeckstatus: "+this.state.deckStatus)
	if(this.state.deckStatus==="decksubmitted")	{
		console.log("[DeckCreation]\tcontinue waiting")
		this.setupTimer();
	}
	 else {
		 localStorage.setItem('status', 'game')
		 this.props.history.push(process.env.PUBLIC_URL+'/game'); 
	 }
	}
  
  addCard = card => () =>{
	  console.log(card.id)
	  if(this.state.cardsInDeck.length<20){
		  this.setState({
			  cardsInDeck: [...this.state.cardsInDeck, card]
		  });
		  this.setState(prevState => { // pass callback in setState to avoid race condition
				let newAvailableCards = prevState.cardsAvailable.slice() //copy array from prevState
				newAvailableCards.splice(card, 1) // remove element
				return {cardsAvailable: newAvailableCards} // update state
		});
	  }
  }
	handleChange() {
		console.log("test");
	};
	submitDeck = () => {
		//Create json array 
		if(this.state.cardsInDeck.length===20){
			let arr = this.state.cardsInDeck.map(card=>({key: card.key}));
			console.log(arr);
			//submit informaiton
			let url = path+'/match/initDeck?deck='+JSON.stringify(arr);
			console.log(url)
			axios.get(url, {params:{
				token: this.props.token
			}}).then(res => {
				let data = res.data
				if(data.status==="ok"){
					console.log("positive response...");
					localStorage.setItem('status', 'deckcomposed')
					//now the question is: has the opponent chosen his/her deck as well?
					//lets suppose that's not the case. Then we cant go to the game. We have to wait  and ask the server when the game's ready. all the time.
					this.setState({deckStatus: "decksubmitted"});
					console.log("deck submitted so deckstatus is "+this.state.deckStatus);
					this.tick()
					this.setState({open: true})
				} else {
					alert ("action failed. "+data.message);
					this.handleRequestCloseDialog();
				}
			})
		} else {
			console.log("argh")
		}
		
	}
	render() {
		const { classes } = this.props;
		const submitButton = (<Button style= {styles.button} onClick={this.submitDeck}>Fini!</Button>);
		const notsubmitButton = (<Button disabled style= {styles.button}>Fini!</Button>);
		const content = (<Grid container spacing={24} alignItems="stretch" style={styles.container}>
				<Grid item xs={12} sm={6}>
					<Card  style={styles.card}>
					<CardHeader
					title="Mon Deck"
					subheader=""
				  />
					  <CardContent>
					  {this.state.cardsInDeck.length==0?"Ajouter des cartes a votre deck svp":(this.state.cardsInDeck.length<20?("Ajouter encore "+(20-this.state.cardsInDeck.length)+" cartes."):"")}
						  <List style={styles.list2}>{this.state.cardsInDeck.map(card =>(<div>
							<ListItem>
							<ListItemText
							  primary={card.name} secondary={"A: "+card.info.attack+ ", D: "+card.info.defense}
							/>
							<ListItemSecondaryAction>
							  <IconButton aria-label="matchmaking" onClick={this.removeCard(card)}>
								-
							  </IconButton>
							</ListItemSecondaryAction>
						  </ListItem><Divider /></div>
						))}
						</List>
					  </CardContent>
					    
						<CardActions>
						{this.state.cardsInDeck.length==20?submitButton:notsubmitButton} 
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6}>
						<Card style={styles.card}>
						<CardHeader
						title="Cartes disponibles"
						subheader=""
					  />
					  <CardContent>
							<List style={styles.list}>{this.state.cardsAvailable.map(card =>(<div>
							<ListItem>
							<ListItemText
							  primary={card.name} secondary={"A: "+card.info.attack+ ", D: "+card.info.defense}
							/>
							<ListItemSecondaryAction>
							  <IconButton onClick={this.addCard(card)}>
								+
							  </IconButton>
							</ListItemSecondaryAction>
						  </ListItem><Divider /></div>
						))}
						</List>

						</CardContent>
					</Card>
					<Dialog open={this.state.open} onClose={this.handleClose} style = {styles.dialog}>
						<DialogTitle>{"Waiting for opponent"}</DialogTitle><DialogContent>
						<CircularProgress className={classes.progress} style = {styles.progress} />
						</DialogContent>
					</Dialog>
				</Grid>
			</Grid>
			);
		return (<div>
		{/*{this.state.connected?content:"Veuillez vous connecter."}*/}
			{content}
			</div>
		);
   	}
}

function mapStateToProps(state) {
  return {
	connected: state.connected,
	user: state.user,
	token: state.token
  };
}


DeckCreation.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(connect(mapStateToProps)(DeckCreation)));
