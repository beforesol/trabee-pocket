import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';

// import './home.scss';

class Home extends React.Component {
  state = {
    type: 'green'
  };

  componentDidMount() {
    // axios.get('api/tests/1')
    //   .then( response => { console.log(response.data); } ) // SUCCESS
    //   .catch( response => { console.log(response); } ); // ERROR
  }

  render() {
    const { type } = this.state;

    return (
      <div className="home">
        <Header type={ type } />
        <p>Hello World of React and Webpack!</p>
        <p>
          <Link to="/dynamic">Navigate to Dynamic Page</Link>
        </p>
      </div>
    );
  };
};

export default Home;
