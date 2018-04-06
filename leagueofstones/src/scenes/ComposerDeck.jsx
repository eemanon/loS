import React from 'react';
import { connect } from 'react-redux';
import MyCard from "../components/MyCard";
import Grid from 'material-ui/Grid';

var path = require('../backendPath').backendpath;

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

class ComposerDeck extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			cardlist : []
		};
	}

	componentDidMount(){
		let url = path+"/cards/getAll";
		fetch(url, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			console.log(data);
			if(data.status==="ok"){
				this.setState({cardlist:data.data});
			} else {
				alert ("action failed. "+data.message);
			}
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		}); 
	}

	render() {
		return (
			<Grid container spacing={24} style={styles.container}>
				{this.state.cardlist.map((item,index)=>(
					<Grid item xs={6} sm={2}>
						<MyCard value={item}/>
					</Grid>
				))}
			</Grid>
		);
	}
}

export default ComposerDeck;