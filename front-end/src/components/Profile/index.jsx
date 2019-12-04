import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '@y0c/react-datepicker';
import 'dayjs/locale/ko';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TRIP, tripActions } from '../../modules/trips';

import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

import { Layer, Select } from '../../components';
import PropTypes from 'prop-types';
import { LAYER_TYPE } from '../../components/Layer';
import { NEW_ROUTER_ID } from '../../pages/Home';
import { STATUS } from '../../store/trip/reducer';
import axios from 'axios';

const style = require('./profile.scss');
const cx = classNames.bind(style);
const {
  axiosGetTripApi,
  setCurrentTripInfo,
  resetCurrentTripInfo
} = tripActions;

const Profile = ({ id, userId, history, onUpdateTab }) => {
  const dispatch = useDispatch();
  const {
    isLoaded: isTripLoaded,
    isFailed,
    currentTripInfo,
  } = useSelector(state => state[TRIP]);

  const [isLoaded, setLoaded] = useState(false);
  const [isOpenLayer, setIsOpenLayer] = useState(false);
  const [layerState, setLayerState] = useState({ openHandler: setIsOpenLayer });
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [country, setCountry] = useState(null);
  const [currency, setCurrency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showSelect, setShowSelect] = useState(false);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const titleInnerText = title || '여기에 여행 제목을 입력해주세요';
  const memoInnerText = memo || '이곳에는 여행에 대한 간단한 메모를 남길 수 있습니다. 여기를 눌러 메모해보세요.';

  const setAllTripData = data => {
    setTitle(data.title);
    setMemo(data.memo);
    setCountry(data.country);
    setImageUrl(data.imageUrl);
    setStartDate(data.startDate);
    setEndDate(data.endDate);

    try {
      setCurrency(data.country.currency);
    } catch {
      setCurrency(null);
    }
  };

  useEffect(() => {
    if (currentTripInfo) {
      setAllTripData(currentTripInfo);
    }
  }, [currentTripInfo]);

  useEffect(() => {
    const status = id !== NEW_ROUTER_ID ? STATUS.EDIT : STATUS.NEW;

    if (id) {
      if (id !== NEW_ROUTER_ID) {
        setShowSelect(false);
        !isTripLoaded && dispatch(axiosGetTripApi({ userId, id }));
      } else {
        setShowSelect(true);
        dispatch(setCurrentTripInfo({
          status,
        }));

        setLoaded(true);
      }
    }
  }, [id]);

  useEffect(() => {
    if (isTripLoaded) {
      const status = id !== NEW_ROUTER_ID ? STATUS.EDIT : STATUS.NEW;

      dispatch(setCurrentTripInfo({
        id,
        status
      }));
      setLoaded(true);
      setAllTripData(currentTripInfo);
    }
  }, [isTripLoaded]);

  const handleTitle = text => {
    setTitle(text);
    dispatch(setCurrentTripInfo({
      title: text
    }));
  };

  const handleMemo = text => {
    setMemo(text);
    dispatch(setCurrentTripInfo({
      memo: text
    }));
  };

  const handleDelete = () => {
    setTitle('');
    setMemo('');
    setCountry(null);
    setStartDate('');
    setEndDate('');
    setCurrency(null);
    dispatch(resetCurrentTripInfo());
    startDateRef.current.handleInputClear();
    endDateRef.current.handleInputClear();
  };

  const handleDeleteBtn = (e, callback) => {
    // todo: 수정해야 됨
    const disabled = currentTripInfo.status === STATUS.DELETE;

    if (disabled) {
      setIsOpenLayer(true);

      setLayerState({
        ...layerState,
        layerType: LAYER_TYPE.TEXT,
        title: '삭제할 데이터가 없습니다.',
        text: '',
        handler: () => setIsOpenLayer(false)
      });

      console.log('disabled delelte');
      return;
    }

    if (currentTripInfo.status === STATUS.NEW) {
      handleDelete();
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
    axios.post('/api/profile/save', { userId, currentTripInfo }).then(response => {
      callback(true, response);
    }).catch(err => {
      callback(false);
    });
  };

  const handleSuccessSave = tripID => {
    history.replace({
      pathname: `/detail/${tripID}`
    });

    dispatch(setCurrentTripInfo({
      id: tripID,
    }));
  };

  const handleFailSave = () => {
    console.log('fail');
  };

  const handleClickSelectCountry = () => {
    setShowSelect(!showSelect);
  };

  const onChangeStartDate = dateInfo => {
    if (dateInfo) {
      const date = dateInfo.$d.toString().split(' ').slice(0, 4).join(' ');

      setStartDate(date);
      dispatch(setCurrentTripInfo({
        startDate: date
      }));
    }
  };

  const onChangeEndDate = dateInfo => {
    if (dateInfo) {
      const date = dateInfo.$d.toString().split(' ').slice(0, 4).join(' ');

      setEndDate(date);
      dispatch(setCurrentTripInfo({
        endDate: date
      }));
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
    isFailed ? (<p>실패하였습니다</p>) : (<p>로딩중...</p>)
  ) : (
    <div className={cx('profile')}>
      <div className={cx('image_area')}>
        <Link to="/" className={cx('btn_home')} />
        <img
          className={cx('cover_image')}
          src={imageUrl}
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
          <button onClick={handleClickSelectCountry} className={cx('btn_select_country')}>
            {
              country ? (
                <div className={cx('country')}>
                  <div className={cx('thumbnail')}>
                    <img
                      src={country.imgUrl}
                      className={cx('image')}
                      alt={country.name}
                    />
                  </div>
                  <span className={cx('name')}>{country.name}</span>
                </div>
              ) : (
                <div className={cx('select_country')}>국가를 선택해주세요.</div>
              )
            }
          </button>
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
          <button onClick={() => onUpdateTab('currency')} className={cx('btn_edit')}>편집</button>
          <p className={cx('currency')}>{currencyText}</p>
        </div>
        <div className={cx('btn_area')}>
          <button type="button" className={cx('btn', 'btn_delete')} onClick={e => onClickDeleteBtn(e)}>이 여행 삭제하기</button>
          <button type="button" className={cx('btn', 'btn_submit')} onClick={e => onClickSaveBtn(e)}>이 여행 저장하기</button>
        </div>
      </div>
      {
        isOpenLayer && (
          <Layer {...layerState} />
        )
      }
      {
        showSelect && (
          <Select
            onSetShowSelect={setShowSelect}
          />
        )
      }
    </div>
  );
};

Profile.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  history: PropTypes.object,
  onUpdateTab: PropTypes.func
};

export default hot(Profile);
