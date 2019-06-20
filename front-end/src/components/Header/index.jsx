import * as React from 'react';
import './header.scss';

const Header = ({ type }) => {
  return (
    <div className="header" style={{'backgroundColor': type}}>
      header
    </div>
  );
};

export default Header;
