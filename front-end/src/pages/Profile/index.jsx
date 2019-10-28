import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

import { Layer } from '../../components/presentations';
import PropTypes from 'prop-types';

const style = require('./profile.scss');
const cx = classNames.bind(style);

const Profile = ({ userId }) => {
  const [isOpenTitleLayer, handleTitleLayer] = useState(false);
  const [isOpenMemoLayer, handleMemoLayer] = useState(false);

  console.log('userId:', userId);

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
          <button type="button" className={cx('btn_title')} onClick={() => handleTitleLayer(true)}>여기에 여행 제목을 입력해주세요</button>
          <button type="button" className={cx('btn_memo')} onClick={() => handleMemoLayer(true)}>이곳에는 여행에 대한 간단한 메모를 남길 수 있습니다. 여기를 눌러 메모해보세요.</button>
        </div>
        <div className={cx('section')}>
          <strong className={cx('title')}>여행 국가</strong>
          <Link to="/select" className={cx('country')}>
            <div className={cx('thumbnail')}>
              <img
                src="https://cdn.crowdpic.net/detail-thumb/thumb_d_2F583E5543F7E19139C6FCFFBF9607A6.jpg"
                className={cx('image')}
                alt="건지"
              />
            </div>
            <p className={cx('name')}>건지</p>
          </Link>
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
          <Link to="/edit" className={cx('btn_edit')}>편집</Link>
          <p className={cx('currency')}>GBP</p>
        </div>
        <div className={cx('btn_area')}>
          <button type="button" className={cx('btn', 'btn_delete')}>이 여행 삭제하기</button>
          <button type="button" className={cx('btn', 'btn_submit')}>이 여행 저장하기</button>
        </div>
      </div>
      {
        isOpenTitleLayer && (
          <Layer
            layerType="title"
            title="여행 제목을 입력해주세요"
            text="아직없어요"
            handler={handleTitleLayer}
          />
        )
      }
      {
        isOpenMemoLayer && (
          <Layer
            layerType="memo"
            title="여행 제목을 입력해주세요"
            text="아직없어요2"
            handler={handleMemoLayer}
          />
        )
      }
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.number,
};

const mapStateToProps = state => ({
  userId: state.user.userId
});

export default hot(connect(mapStateToProps, null)(Profile));
