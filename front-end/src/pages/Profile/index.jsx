import React, { useState, useEffect } from 'react';
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

const style = require('./profile.scss');
const cx = classNames.bind(style);

const Profile = ({ userId, match, onSetCurrentTripInfo, currentTripInfo, onResetCurrentTripInfo }) => {
  const [isOpenTitleLayer, isTitleLayer] = useState(false);
  const [isOpenMemoLayer, isMemoLayer] = useState(false);
  const [isOpenDeleteLayer, isDeleteLayer] = useState(false);
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [id, setId] = useState('');
  const [country, setCountry] = useState(null);

  const titleInnerText = title || '여기에 여행 제목을 입력해주세요';
  const memoInnerText = memo || '이곳에는 여행에 대한 간단한 메모를 남길 수 있습니다. 여기를 눌러 메모해보세요.';

  useEffect(() => {
    const routeId = match.params.id;

    if (routeId !== NEW_ROUTER_ID) {
      onSetCurrentTripInfo({ id: routeId });
    }

    setId(routeId);

    if (currentTripInfo) {
      setTitle(currentTripInfo.title);
      setMemo(currentTripInfo.memo);
      setCountry(currentTripInfo.country);
    }
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
    onResetCurrentTripInfo();
  };

  const handleDeleteBtn = e => {
    const disabled = !currentTripInfo.status || currentTripInfo.status === STATUS.DELETE;

    if (disabled) e.preventDefault();

    isDeleteLayer(true);
  };

  return (
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
          <button type="button" className={cx('btn_title')} onClick={() => isTitleLayer(true)}>{titleInnerText}</button>
          <button type="button" className={cx('btn_memo')} onClick={() => isMemoLayer(true)}>{memoInnerText}</button>
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
            <button type="button" className={cx('btn_date')}>시작일 입력하기</button>
          </div>
          <div className={cx('date')}>
            <span className={cx('date_title')}>종료일</span>
            <button type="button" className={cx('btn_date')}>종료일 입력하기</button>
          </div>
        </div>
        <div className={cx('section')}>
          <strong className={cx('title')}>화폐 & 예산</strong>
          <Link to={`/currency/${id}`} className={cx('btn_edit')}>편집</Link>
          <p className={cx('currency')}>GBP</p>
        </div>
        <div className={cx('btn_area')}>
          <button type="button" className={cx('btn', 'btn_delete')} onClick={() => handleDeleteBtn(true)}>이 여행 삭제하기</button>
          <button type="button" className={cx('btn', 'btn_submit')}>이 여행 저장하기</button>
        </div>
      </div>
      {
        isOpenTitleLayer && (
          <Layer
            layerType={LAYER_TYPE.TITLE}
            title="여행 제목을 입력해주세요"
            text={title}
            openHandler={isTitleLayer}
            handler={handleTitle}
          />
        )
      }
      {
        isOpenMemoLayer && (
          <Layer
            layerType={LAYER_TYPE.MEMO}
            title="여행에 대해 간단히 메모해보세요"
            text={memo}
            openHandler={isMemoLayer}
            handler={handleMemo}
          />
        )
      }
      {
        isOpenDeleteLayer && (
          <Layer
            layerType={LAYER_TYPE.DELETE}
            title="이 여행 삭제하기"
            text={`정말, 이 여행(${title})을 삭제하시겠습니까?`}
            openHandler={isDeleteLayer}
            handler={handleDelete}
          />
        )
      }
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.string,
  match: PropTypes.object,
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
