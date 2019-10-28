import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserId } from '../../store/user/action';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

export const NEW_ROUTER_ID = 'new';

const style = require('./home.scss');
const cx = classNames.bind(style);

const Home = ({ userId, onSetUserId }) => {
  useEffect(() => {
    onSetUserId('jeonsol');
  }, []);

  return (
    <div className={cx('home')}>
      <Link to={`/select/${NEW_ROUTER_ID}`} className={cx('btn_add')}>새 여행 만들기</Link>
    </div>
  );
};

Home.propTypes = {
  userId: PropTypes.string,
  onSetUserId: PropTypes.func
};

const mapStateToProps = state => ({
  userId: state.user.userId
});

const mapDispatchToProps = dispatch => ({
  onSetUserId: userId => dispatch(setUserId(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
