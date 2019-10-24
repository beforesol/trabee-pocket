import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import axios from 'axios';

import { Search, Country } from '../../components/presentations';

const style = require('./select.scss');
const cx = classNames.bind(style);

const Select = () => {
  const [continents, setContinent] = useState(null);
  const [activeCountry, setActiveCountry] = useState('가나');
  const [activeCountryData, setActiveCountryData] = useState(null);

  useEffect(() => {
    axios.get('/api/select').then(response => {
      setContinent(response.data);

      response.data.forEach(continent => {
        continent.countries.forEach(country => {
          if (country.name === activeCountry) {
            setActiveCountryData(country);
          }
        });
      });
    });
  }, []);

  useEffect(() => {
    if (continents) {
      continents.forEach(continent => {
        continent.countries.forEach(country => {
          if (country.name === activeCountry) {
            setActiveCountryData(country);
          }
        });
      });
    }
  }, [activeCountry]);

  return (
    <div className={cx('select')}>
      <div className={cx('header')}>
        <strong className={cx('title')}>여행할 나라를 선택해주세요</strong>
        <p className={cx('text')}>여러 나라를 선택하면 폴더가 생성됩니다.</p>
        <Link to="/" className={cx('btn_close')}><span className={cx('blind')}>닫기</span></Link>
      </div>
      <div className={cx('wrapper')}>
        <Search />
        <Country
          continents={continents}
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
        />
      </div>
      <div className={cx('selected_area')}>
        <div className={cx('selected_country')}>
          <p className={cx('country')}>선택한 나라</p>
          { activeCountryData && (
            <img src={activeCountryData.imgUrl} alt={activeCountryData.name} className={cx('image')} />
          )}
        </div>
        <button type="button" className={cx('btn_selected', 'selected')}>선택완료</button>
      </div>
    </div>
  );
};

export default hot(Select);
