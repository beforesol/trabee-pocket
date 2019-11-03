import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '@y0c/react-datepicker';
import 'dayjs/locale/ko';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

import { Layer } from '../../components/presentations';
import PropTypes from 'prop-types';
import { setCurrentTripInfo, resetCurrentTripInfo } from '../../store/trip/action';
import { LAYER_TYPE } from '../../components/presentations/Layer';
import { NEW_ROUTER_ID } from '../Home';
import { STATUS } from '../../store/trip/reducer';
import axios from 'axios';

const style = require('./profile.scss');
const cx = classNames.bind(style);

const Profile = ({ userId, match, history, onSetCurrentTripInfo, currentTripInfo, onResetCurrentTripInfo }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isOpenLayer, setIsOpenLayer] = useState(false);
  const [layerState, setLayerState] = useState({ openHandler: setIsOpenLayer });
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [id, setId] = useState('');
  const [country, setCountry] = useState(null);
  const [currency, setCurrency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const titleInnerText = title || '여기에 여행 제목을 입력해주세요';
  const memoInnerText = memo || '이곳에는 여행에 대한 간단한 메모를 남길 수 있습니다. 여기를 눌러 메모해보세요.';

  const setAllTripData = data => {
    setTitle(data.title);
    setMemo(data.memo);
    setCountry(data.country);
    setStartDate(data.startDate);
    setEndDate(data.endDate);

    try {
      setCurrency(data.country.currency);
    } catch {
      setCurrency(null);
    }
  };

  useEffect(() => {
    const routeId = match.params.id;
    const { state } = history.location;
    const fromSelect = typeof state === 'object' && Object.prototype.hasOwnProperty.call(state, 'select');
    const status = routeId !== NEW_ROUTER_ID ? STATUS.EDIT : STATUS.NEW;

    if (fromSelect) {
      if (currentTripInfo) {
        onSetCurrentTripInfo({ status });
        setAllTripData(currentTripInfo);
        setLoaded(true);
      }

      return;
    }

    if (routeId !== NEW_ROUTER_ID) {
      axios.post('/api/profile', { userId, id: routeId }).then(response => {
        const { data } = response;

        if (response.data) {
          onSetCurrentTripInfo({
            id: routeId,
            status,
            ...data
          });

          setLoaded(true);
          setAllTripData(data);
        }
      });
    } else {
      onSetCurrentTripInfo({
        status,
      });

      setLoaded(true);
    }

    setId(routeId);
  }, []);

  const handleTitle = text => {
    setTitle(text);
    onSetCurrentTripInfo({ title: text });
  };

  const handleMemo = text => {
    setMemo(text);
    onSetCurrentTripInfo({ memo: text });
  };

  const handleDelete = () => {
    setTitle('');
    setMemo('');
    setCountry(null);
    setStartDate('');
    setEndDate('');
    setCurrency(null);
    onResetCurrentTripInfo();
    startDateRef.current.handleInputClear();
    endDateRef.current.handleInputClear();
  };

  const handleDeleteBtn = (e, callback) => {
    const disabled = !currentTripInfo.status || currentTripInfo.status === STATUS.DELETE;

    if (disabled) {
      console.log('disabled delelte');
      e.preventDefault();
      return;
    }

    axios.post('/api/profile/delete', { userId, id }).then(response => {
      callback(true, response);
    }).catch(err => {
      callback(false);
    });
  };

  const handleSuccessDelete = () => {
    handleDelete();
    history.replace('/');
  };

  const handleFailDelete = () => {
    console.log('fail');
  };

  const handleSaveBtn = (e, callback) => {
    const disabled = !currentTripInfo.status || currentTripInfo.status === STATUS.DELETE;

    if (disabled) {
      console.log('disabled save');
      e.preventDefault();
      return;
    }

    axios.post('/api/profile/save', { userId, currentTripInfo }).then(response => {
      callback(true, response);
    }).catch(err => {
      callback(false);
    });
  };

  const handleSuccessSave = tripID => {
    history.replace({
      pathname: `/profile/${tripID}`
    });

    onSetCurrentTripInfo({ id: tripID });
  };

  const handleFailSave = () => {
    console.log('fail');
  };

  const onChangeStartDate = dateInfo => {
    if (dateInfo) {
      const date = dateInfo.$d.toString().split(' ').slice(0, 4).join(' ');

      setStartDate(date);
      onSetCurrentTripInfo({ startDate: date });
    }
  };

  const onChangeEndDate = dateInfo => {
    if (dateInfo) {
      const date = dateInfo.$d.toString().split(' ').slice(0, 4).join(' ');

      setEndDate(date);
      onSetCurrentTripInfo({ endDate: date });
    }
  };

  const onClickTitle = () => {
    setIsOpenLayer(true);

    setLayerState({
      ...layerState,
      layerType: LAYER_TYPE.INPUT,
      title: '여행 제목을 입력해주세요',
      text: title,
      handler: handleTitle
    });
  };

  const onClickMemo = () => {
    setIsOpenLayer(true);

    setLayerState({
      ...layerState,
      layerType: LAYER_TYPE.INPUT,
      title: '여행에 대해 간단히 메모해보세요',
      text: memo,
      handler: handleMemo
    });
  };

  const onClickDeleteBtn = e => {
    handleDeleteBtn(e, (state, response) => {
      setIsOpenLayer(true);

      if (state) {
        setLayerState({
          ...layerState,
          layerType: LAYER_TYPE.TEXT,
          title: '삭제를 성공하였습니다.',
          text: '감사합니다.',
          handler: handleSuccessDelete
        });
      } else {
        setLayerState({
          ...layerState,
          layerType: LAYER_TYPE.TEXT,
          title: '삭제를 실패하였습니다.',
          text: '다시 시도해 주세요.',
          handler: handleFailDelete
        });
      }
    });
  };

  const onClickSaveBtn = e => {
    handleSaveBtn(e, (state, response) => {
      setIsOpenLayer(true);

      if (state) {
        setLayerState({
          ...layerState,
          layerType: LAYER_TYPE.TEXT,
          title: '저장을 성공하였습니다.',
          text: '즐거운 여행 되세요.',
          handler: () => handleSuccessSave(response.data.id)
        });
      } else {
        setLayerState({
          ...layerState,
          layerType: LAYER_TYPE.TEXT,
          title: '저장을 실패하였습니다.',
          text: '다시 시도해 주세요.',
          handler: handleFailSave
        });
      }
    });
  };

  const currencyText = currency ? currency.en : '';

  return !isLoaded ? (
    <p>로딩중...</p>
  ) : (
    <div className={cx('profile')}>
      <div className={cx('image_area')}>
        <Link to="/" className={cx('btn_home')} />
        <img
          className={cx('cover_image')}
          src="https://cdn.crowdpic.net/detail-thumb/thumb_d_2F583E5543F7E19139C6FCFFBF9607A6.jpg"
          alt="cover"
        />
        <button type="button" className={cx('btn_change')}>커버 사진 변경</button>
      </div>
      <div className={cx('contents')}>
        <div className={cx('title_area')}>
          <button type="button" className={cx('btn_title')} onClick={onClickTitle}>{titleInnerText}</button>
          <button type="button" className={cx('btn_memo')} onClick={onClickMemo}>{memoInnerText}</button>
        </div>
        <div className={cx('section')}>
          <strong className={cx('title')}>여행 국가</strong>
          {
            country ? (
              <Link to={`/select/${id}`} className={cx('country')}>
                <div className={cx('thumbnail')}>
                  <img
                    src={country.imgUrl}
                    className={cx('image')}
                    alt={country.name}
                  />
                </div>
                <p className={cx('name')}>{country.name}</p>
              </Link>
            ) : (
              <Link to={`/select/${id}`} className={cx('select_country')}>국가를 선택해주세요.</Link>
            )
          }
        </div>
        <div className={cx('section')}>
          <strong className={cx('title')}>여행 날짜</strong>
          <div className={cx('date')}>
            <span className={cx('date_title')}>시작일</span>
            <div className={cx('btn_date')}>
              {
                !startDate && (
                  <p className={cx('text')}>시작일 입력하기</p>
                )
              }
              <DatePicker initialDate={startDate} onChange={onChangeStartDate} ref={startDateRef} />
            </div>
          </div>
          <div className={cx('date')}>
            <span className={cx('date_title')}>종료일</span>
            <div className={cx('btn_date')}>
              {
                !endDate && (
                  <p className={cx('text')}>종료 입력하기</p>
                )
              }
              <DatePicker initialDate={endDate} onChange={onChangeEndDate} ref={endDateRef} />
            </div>
          </div>
        </div>
        <div className={cx('section')}>
          <strong className={cx('title')}>화폐 & 예산</strong>
          <Link to={`/currency/${id}`} className={cx('btn_edit')}>편집</Link>
          <p className={cx('currency')}>{ currencyText }</p>
        </div>
        <div className={cx('btn_area')}>
          <button type="button" className={cx('btn', 'btn_delete')} onClick={e => onClickDeleteBtn(e)}>이 여행 삭제하기</button>
          <button type="button" className={cx('btn', 'btn_submit')} onClick={e => onClickSaveBtn(e)}>이 여행 저장하기</button>
        </div>
      </div>
      {
        isOpenLayer && (
          <Layer { ...layerState } />
        )
      }
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.string,
  match: PropTypes.object,
  history: PropTypes.object,
  currentTripInfo: PropTypes.object,
  onSetCurrentTripInfo: PropTypes.func,
  onResetCurrentTripInfo: PropTypes.func
};

const mapStateToProps = state => ({
  userId: state.user.userId,
  currentTripInfo: state.trip.currentTripInfo
});

const mapDispatchToProps = dispatch => ({
  onSetCurrentTripInfo: data => dispatch(setCurrentTripInfo(data)),
  onResetCurrentTripInfo: () => dispatch(resetCurrentTripInfo())
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(Profile));
