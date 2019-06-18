import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import './home.scss';

interface Props {

}

interface State {
  type: string;
}

class Home extends React.Component<Props, State> {
  state:State = {
    type: 'green'
  };

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