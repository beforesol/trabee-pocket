import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./expenseInput.scss');
const cx = classNames.bind(style);

const ExpenseInput = ({ }) => (
  <div className={cx('expense_input')}>
    <input
      type="text"
      className={cx('text_input')}
      placeholder='여기에 항목명을 입력해주세요 (선택)'
    />
    <div className={cx('keyboard_area')}>
      <div className={cx('btn_area')}>
        <button className={cx('btn', 'cancle')}>취소</button>
        <button className={cx('btn', 'save')}>저장</button>
      </div>
      <table className={cx('keyboard')}>
        <tbody>
          <tr>
            <td><button>1</button></td>
            <td><button>2</button></td>
            <td><button>3</button></td>
            <td><button className={cx('operator')}>/</button></td>
          </tr>
          <tr>
            <td><button>4</button></td>
            <td><button>5</button></td>
            <td><button>6</button></td>
            <td><button className={cx('operator')}>x</button></td>
          </tr>
          <tr>
            <td><button>7</button></td>
            <td><button>6</button></td>
            <td><button>9</button></td>
            <td><button className={cx('operator')}>+</button></td>
          </tr>
          <tr>
            <td><button>.</button></td>
            <td><button className={cx('operator')}>0</button></td>
            <td><button className={cx('delete')}><span className={cx('blind')}>지우기</span></button></td>
            <td><button className={cx('operator')}>-</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default hot(ExpenseInput);
