import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./layer.scss');
const cx = classNames.bind(style);

const Layer = ({ layerType, title, handler, text }) => {
  const textArea = useRef(null);

  useEffect(() => {
    textArea.current.focus();
    textArea.current.value = text;
  });

  const handleClose = () => {
    handler(false);
  };

  const handleSumbit = () => {
    console.log(text, '를 서버에 보내야 합니다.');
    handler(false);
  };

  return (
    <div className={cx('layer')}>
      <div className={cx('inner')}>
        <div className={cx('content_area')}>
          <p className={cx('title')}>{ title }</p>
          <textarea
            className={cx('textarea')}
            name="text"
            id="layerText"
            cols="30"
            rows="10"
            ref={textArea}
          />
        </div>
        <div className={cx('button_area')}>
          <button className={cx('btn', 'btn_close')} onClick={ handleClose }>취소</button>
          <button className={cx('btn', 'btn_submit')} onClick={handleSumbit}>완료</button>
        </div>
      </div>
    </div>
  );
};

Layer.propTypes = {
  layerType: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  handler: PropTypes.func
};

export default hot(Layer);
