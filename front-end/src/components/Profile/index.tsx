import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '@y0c/react-datepicker';
import 'dayjs/locale/ko';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { useDispatch } from 'react-redux';

import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

import {
  tripActions,
  STATUS
} from '@modules/trips';

import { Layer } from '@components/index';
import { LAYER_TYPE } from '@components/Layer';
import { Link } from 'react-router-dom';

import { ROUTE_PATH } from '@config/routes';

import axios from 'axios';
import { ITrip } from '../../types/api';
import { encodeImageFileAsURL, getImageSrc } from '@utils/index';
import { DUMMY_IMAGES } from '../../dummy/images';

const style = require('./index.scss');
const cx = classNames.bind(style);

const {
  setCurrentTripInfo,
  resetCurrentTripInfo
} = tripActions;

interface IOwnProps {
  currentTripInfo: ITrip
  id: string
  userId: string
  history: any
  onUpdateTab: (tab: string) => void
  onSetShowSelect: (isShow: boolean) => void
}

const MAX_FILE_SIZE = 50; // KB

const Profile: React.FC<IOwnProps> = ({
  currentTripInfo,
  id,
  userId,
  history,
  onUpdateTab,
  onSetShowSelect
}) => {
  const startDateRef = useRef<any>(null);
  const endDateRef = useRef<any>(null);

  const dispatch = useDispatch();

  const [isOpenLayer, setIsOpenLayer] = useState(false);
  const [layerState, setLayerState] = useState<any>({ openHandler: setIsOpenLayer });
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [country, setCountry] = useState<any>(null);
  const [startDate, setStartDate] = useState<any>('');
  const [endDate, setEndDate] = useState<any>('');

  const setAllTripData = (data: any) => {
    const imageUrl = getImageSrc(data.imageUrl.type, data.imageUrl.fileData);

    setTitle(data.title);
    setMemo(data.memo);
    setCountry(data.country);
    setImageUrl(imageUrl);
    setStartDate(data.startDate);
    setEndDate(data.endDate);
  };

  const handleTitle = (text: any) => {
    setTitle(text);
    dispatch(setCurrentTripInfo({
      title: text
    }));
  };

  const handleMemo = (text: any) => {
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
    dispatch(resetCurrentTripInfo());
    startDateRef.current.handleInputClear();
    endDateRef.current.handleInputClear();
  };

  const handleDeleteBtn = (_e: any, callback: any) => {
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
    }).catch(() => {
      callback(false);
    });
  };

  const handleSuccessDelete = () => {
    handleDelete();
    history.replace(ROUTE_PATH.HOME.url);
  };

  const handleFailDelete = () => {
    console.log('fail');
  };

  const handleSaveBtn = (_e: any, callback: any) => {
    if (!startDate || !endDate) {
      setIsOpenLayer(true);

      setLayerState({
        ...layerState,
        layerType: LAYER_TYPE.TEXT,
        title: '저장을 실패하였습니다.',
        text: '날짜를 정확하게 입력해 주세요.',
        handler: () => { }
      });
    } else {
      axios.post('/api/profile/save', { userId, currentTripInfo }).then(response => {
        callback(true, response);
      }).catch(() => {
        callback(false);
      });
    }
  };

  const handleSuccessSave = (tripID: any) => {
    history.replace({
      pathname: `${ROUTE_PATH.DETAIL.url}/${tripID}`
    });

    dispatch(setCurrentTripInfo({
      id: tripID,
    }));
  };

  const handleFailSave = () => {
    console.log('fail');
  };

  const onChangeStartDate = (dateInfo: any) => {
    if (dateInfo) {
      const date = dateInfo.$d.toString().split(' ').slice(0, 4).join(' ');

      if (endDate && new Date(endDate).getTime() < new Date(date).getTime()) {
        setIsOpenLayer(true);

        setLayerState({
          ...layerState,
          layerType: LAYER_TYPE.TEXT,
          title: '시작일을 다시 입력해주세요.',
          text: '종료일 이전으로 지정해주세요.',
          handler: () => { }
        });

        setStartDate('');
        dispatch(setCurrentTripInfo({
          startDate: ''
        }));
      } else {
        setStartDate(date);
        dispatch(setCurrentTripInfo({
          startDate: date
        }));
      }
    }
  };

  const onChangeEndDate = (dateInfo: any) => {
    if (dateInfo) {
      const date = dateInfo.$d.toString().split(' ').slice(0, 4).join(' ');

      if (startDate && new Date(startDate).getTime() > new Date(date).getTime()) {
        setIsOpenLayer(true);

        setLayerState({
          ...layerState,
          layerType: LAYER_TYPE.TEXT,
          title: '종료일을 다시 입력해주세요.',
          text: '시작일 이후로 지정해주세요.',
          handler: () => { }
        });

        setEndDate('');
        dispatch(setCurrentTripInfo({
          endDate: ''
        }));
      } else {
        setEndDate(date);
        dispatch(setCurrentTripInfo({
          endDate: date
        }));
      }
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

  const handleClickPhotoDefault = () => {
    dispatch(setCurrentTripInfo({
      imageUrl: {
        type: 'DEFAULT',
        fileData: DUMMY_IMAGES[Math.floor(Math.random() * DUMMY_IMAGES.length)]
      }
    }));
  }

  const handleChangePhoto = (e: any) => {
    const file = e.target.files[0];
    const { type, size } = file;
    const fileSize = size / 1024; // KB

    if (fileSize > MAX_FILE_SIZE) {
      setIsOpenLayer(true);

      setLayerState({
        ...layerState,
        layerType: LAYER_TYPE.TEXT,
        title: '파일 용량이 너무 큽니다.',
        text: '50KB 이하의 사진을 사용해주세요. 뎨뎡..ㅠ',
        handler: () => { }
      });

      return;
    }

    if (
      type.toLowerCase() === 'image/jpg' ||
      type.toLowerCase() === 'image/jpeg' ||
      type.toLowerCase() === 'image/png'
    ) {
      encodeImageFileAsURL(file).then((data: any) => {
        const imageFile = data.split(',');

        dispatch(setCurrentTripInfo({
          imageUrl: {
            type: imageFile[0],
            fileData: imageFile[1]
          }
        }));
      })
    } else {
      setIsOpenLayer(true);

      setLayerState({
        ...layerState,
        layerType: LAYER_TYPE.TEXT,
        title: '파일 포맷이 올바르지 않습니다.',
        text: 'jpg, jpeg, png 사진을 사용해주세요.',
        handler: () => { }
      });

      return;
    }
  }

  const onClickDeleteBtn = (e: any) => {
    handleDeleteBtn(e, (state: any) => {
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

  const onClickSaveBtn = (e: any) => {
    handleSaveBtn(e, (state: any, response: any) => {
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
          text: '용량이 작고 소중해서리..이미지 사이즈를 줄여주세요...',
          handler: handleFailSave
        });
      }
    });
  };

  useEffect(() => {
    if (currentTripInfo) {
      setAllTripData(currentTripInfo);
    }
  }, [currentTripInfo]);

  const currencyText = country ? country.currency.en : '';
  const titleInnerText = title || '여기에 여행 제목을 입력해주세요';
  const memoInnerText = memo || '이곳에는 여행에 대한 간단한 메모를 남길 수 있습니다. 여기를 눌러 메모해보세요.';

  return (
    <div className={cx('profile')}>
      <div className={cx('image_area')}>
        <Link to={ROUTE_PATH.HOME.url} className={cx('btn_home')} />
        <img
          className={cx('cover_image')}
          src={imageUrl}
          alt="cover"
        />
        <div className={cx('btn_change_area')}>
          <button type="button" className={cx('btn_change')} onClick={handleClickPhotoDefault}>기본 사진</button>
          <div className={cx('btn_change')}>
            커버 사진 변경
          <input type="file" className={cx('input_change')} onChange={(e) => handleChangePhoto(e)} />
          </div>
        </div>
      </div>
      <div className={cx('contents')}>
        <div className={cx('title_area')}>
          <button type="button" className={cx('btn_title')} onClick={onClickTitle}>{titleInnerText}</button>
          <button type="button" className={cx('btn_memo')} onClick={onClickMemo}>{memoInnerText}</button>
        </div>
        <div className={cx('section')}>
          <strong className={cx('title')}>여행 국가</strong>
          <button onClick={() => onSetShowSelect(true)} className={cx('btn_select_country')}>
            {country ? (
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
              )}
          </button>
        </div>
        <div className={cx('section')}>
          <strong className={cx('title')}>여행 날짜</strong>
          <div className={cx('date')}>
            <span className={cx('date_title')}>시작일</span>
            <div className={cx('btn_date')}>
              {startDate ? (
                <DatePicker initialDate={startDate} onChange={onChangeStartDate} ref={startDateRef} />
              ) : (
                  <>
                    <p className={cx('text')}>시작일 입력하기</p>
                    <DatePicker initialDate={startDate} onChange={onChangeStartDate} ref={startDateRef} />
                  </>
                )}
            </div>
          </div>
          <div className={cx('date')}>
            <span className={cx('date_title')}>종료일</span>
            <div className={cx('btn_date')}>
              {endDate ? (
                <DatePicker initialDate={endDate} onChange={onChangeEndDate} ref={endDateRef} />
              ) : (
                  <>
                    <p className={cx('text')}>종료 입력하기</p>
                    <DatePicker initialDate={endDate} onChange={onChangeEndDate} ref={endDateRef} />
                  </>
                )}
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
    </div >
  );
};

export default hot(Profile);
