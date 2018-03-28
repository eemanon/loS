import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './scenes/Home'
import Header from "./components/Header";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



const initialState = {
  connected: false,
  user: ''
};

function reducer(state = initialState, action) {
  switch(action.type) {
	case 'CONNECT':
      return Object.assign({}, state, {
        connected: true
      });
	case 'DISCONNECT':
      return Object.assign({}, state, {
        connected: false
      });
	case 'SETUSER':
      return Object.assign({}, state, {
        user: action.value
      });
    default:
      return state;
  }
}
const store = createStore(reducer);

const styles = {
  container: {
    textAlign: 'center',
  	backgroundColor: '#F5F5F5',
  },

  main: {
    paddingTop:'80px',
  },
}

class App extends Component {
  render() {
    return (
	<Provider store={store}>
      <Router>
	    <div>
		<Header />
		<div style={styles.main}> 
		  <Home buttontext="clique-moi" />
		</div>
		</div>
      </Router>
	</Provider>
    );
  }
}

export default App;
