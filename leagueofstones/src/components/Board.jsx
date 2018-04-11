import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import MyCard from './MyCard';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	},
}

class Board extends React.Component {

	render(){
		return(
			<Grid container spacing={20} style={styles.container}>
				{this.props.value.map((item,index)=>(
					<Grid item xs={4} sm={2}>
						<MyCard value={item}/>
					</Grid>
				))}
			</Grid>
		);
	}

}

export default Board;