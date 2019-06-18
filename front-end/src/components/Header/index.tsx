import * as React from 'react';
import './header.scss';

interface OwnProps {
  type: string
}

const Home: React.SFC<OwnProps> = ({ type }) => {
    return (
        <div className="header" style={{'backgroundColor': type}}>
           header
        </div>
    );
};

export default Home;