import { Link } from 'react-router-dom';
import * as React from 'react';
import Header from '../Header';
import classNames from 'classnames/bind';
// import axios from 'axios';
const style = require('./home.scss');

const cx = classNames.bind(style);

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
      <div className={cx('home')}>
        <Header type={ type } />
        <p>Hello World of React and Webpack!</p>
        <p>
          <Link to="/dynamic">Navigate to Dynamic Page</Link>
        </p>
      </div>
    );
  }
}

export default Home;
