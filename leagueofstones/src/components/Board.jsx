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
			<Grid container spacing={20} style={styles.container} spacing={16}>
				{this.props.value.map((item,index)=>(
					<Grid item xs={4} sm={2}>
						<MyCard value={item} pos={this.props.pos} setSelectedAttacker={this.props.setSelectedAttacker} setSelectedAttacked = {this.props.setSelectedAttacked} />
					</Grid>
				))}
			</Grid>
		);
	}

}

export default Board;