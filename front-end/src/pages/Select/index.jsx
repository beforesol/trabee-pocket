import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import axios from 'axios';

import { Search, Country } from '../../components/presentations';

const style = require('./select.scss');
const cx = classNames.bind(style);

const Select = () => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios.get('/api/select').then(response => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div className={cx('select')}>
      <div className={cx('header')}>
        <strong className={cx('title')}>여행할 나라를 선택해주세요</strong>
        <p className={cx('text')}>여러 나라를 선택하면 폴더가 생성됩니다.</p>
        <Link to="/" className={cx('btn_close')}><span className={cx('blind')}>닫기</span></Link>
      </div>
      <div className={cx('wrapper')}>
        <Search />
        <Country countries={countries} />
      </div>
      <div className={cx('selected_area')}>
        <div className={cx('selected_country')}>
          <p className={cx('country')}>선택한 나라<em className={cx('number')}>1</em></p>
          <img src="data:image/png;base64,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" alt="건지" className={cx('image')}/>
        </div>
        <button type="button" className={cx('btn_selected', 'selected')}>선택완료</button>
      </div>
    </div>
  );
};

export default hot(Select);
