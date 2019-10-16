import * as React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./header.scss');

const cx = classNames.bind(style);

const Header = ({ type }) => (
  <div className={ cx('header') } style={{ 'backgroundColor': type }}>
    header
  </div>
);

Header.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Header;
