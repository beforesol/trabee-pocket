import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import axios from 'axios';

import { Search, Continent, Country } from '../../components/presentations';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentTripInfo } from '../../store/trip/action';

const style = require('./select.scss');
const cx = classNames.bind(style);

const Select = ({ match, onSetCurrentTripInfo }) => {
  const [continents, setContinent] = useState(null);
  const [countries, setCountries] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [activeCountryData, setActiveCountryData] = useState(null);
  const [recommendCountries, setRecommendCounries] = useState(null);
  const [id, setId] = useState('');

  useEffect(() => {
    axios.get('/api/select').then(response => {
      const countriesArray = [];

      setContinent(response.data);

      response.data.forEach(continent => {
        continent.countries.forEach(country => {
          countriesArray.push(country);

          if (country.name === activeCountry) {
            setActiveCountryData(country);
          }
        });
      });

      setCountries(countriesArray);
    });

    setId(match.params.id);
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

  const handleChangeInput = text => {
    const recommendCountryArray = countries.filter(country => country.name.indexOf(text) !== -1);

    setRecommendCounries(recommendCountryArray);
  };

  const handleResetInput = () => {
    setRecommendCounries(null);
  };

  const handleSubmit = e => {
    if (!activeCountry) e.preventDefault();

    onSetCurrentTripInfo({
      country: activeCountryData
    });
  };

  return (
    <div className={cx('select')}>
      <div className={cx('header')}>
        <strong className={cx('title')}>여행할 나라를 선택해주세요</strong>
        <p className={cx('text')}>여러 나라를 선택하면 폴더가 생성됩니다.</p>
        <button className={cx('btn_close')} onClick={() => { history.back(); }}><span className={cx('blind')}>닫기</span></button>
      </div>
      <div className={cx('wrapper')}>
        <Search
          handleChangeInput={handleChangeInput}
          handleResetInput={handleResetInput}
        />
        <>
          { recommendCountries ? (
            <Country
              countries={recommendCountries}
              activeCountry={activeCountry}
              setActiveCountry={setActiveCountry}
            />
          ) : (
            <Continent
              continents={continents}
              activeCountry={activeCountry}
              setActiveCountry={setActiveCountry}
            />
          )}
        </>
      </div>
      <div className={cx('selected_area')}>
        <div className={cx('selected_country')}>
          <p className={cx('country')}>선택한 나라</p>
          { activeCountryData && (
            <img src={activeCountryData.imgUrl} alt={activeCountryData.name} className={cx('image')} />
          )}
        </div>
        <Link to={{ pathname: `/detail/${id}`, state: { select: true } }} className={cx('btn_selected', { 'selected': activeCountry })} onClick={e => handleSubmit(e) }>선택완료</Link>
      </div>
    </div>
  );
};

Select.propTypes = {
  match: PropTypes.object,
  onSetCurrentTripInfo: PropTypes.func
};

// const mapStateToProps = state => ({
//   userId: state.user.userId
// });

const mapDispatchToProps = dispatch => ({
  onSetCurrentTripInfo: data => dispatch(setCurrentTripInfo(data))
});


export default hot(connect(null, mapDispatchToProps)(Select));
