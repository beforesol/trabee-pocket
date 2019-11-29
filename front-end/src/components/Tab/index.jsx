import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const style = require('./tab.scss');
const cx = classNames.bind(style);

export const TAB_INFO = {
  PROFILE: {
    name: 'profile',
    className: 'profile',
    text: '여행 프로필'
  },
  CURRENCY: {
    name: 'currency',
    className: 'currency',
    text: '화폐 & 예산'
  },
  EXPENSE: {
    name: 'expense',
    className: 'expense',
    text: '지출목록'
  },
  REPORT: {
    name: 'report',
    className: 'report',
    text: '리포트'
  }
};

const Tab = ({ updateTab }) => {
  const handleAddExpense = () => {
    console.log('handle Add Expense');
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemArray = [];

    Object.values(TAB_INFO).forEach((item, index) => {
      if (index === 2) {
        itemArray.push(
          <div className={cx('btn_tab')} key={'+'}>
            <button
              type="button"
              onClick={handleAddExpense}
              className={cx('btn_add')}> + </button>
          </div>
        );
      }

      itemArray.push(
        <div className={cx('btn_tab')} key={item.name}>
          <button
            type="button"
            className={cx(`${item.className}`)}
            onClick={() => updateTab(item.name)}
          >
            <span className={cx('text')}>
              {item.text}
            </span>
          </button>
        </div>
      );
    });

    setItems(itemArray);
  }, []);

  return (
    <div className={cx('tab')}>
      {items}
    </div>
  );
};

Tab.propTypes = {
  updateTab: PropTypes.func
};

const mapStateToProps = state => ({
});

export default hot(connect(mapStateToProps, null)(Tab));
