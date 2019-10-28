import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./layer.scss');
const cx = classNames.bind(style);

export const LAYER_TYPE = {
  TITLE: 'TITLE',
  MEMO: 'MEMO',
  DELETE: 'DELETE'
};

const Layer = ({ layerType, title, openHandler, handler, text }) => {
  const textArea = useRef(null);
  const isTextContent = layerType === LAYER_TYPE.DELETE;

  useEffect(() => {
    if (!isTextContent) {
      textArea.current.focus();
      textArea.current.value = text;
    }
  });

  const handleClose = () => {
    openHandler(false);
  };

  const handleSumbit = () => {
    if (!isTextContent) {
      const newText = textArea.current.value;

      handler(newText);
    } else {
      handler();
    }

    openHandler(false);
  };

  return (
    <div className={cx('layer')}>
      <div className={cx('inner')}>
        <div className={cx('content_area')}>
          <p className={cx('title')}>{ title }</p>
          {
            isTextContent ? (
              <div className={cx('text')}>{text}</div>
            ) : (
              <textarea
                className={cx('textarea')}
                name="text"
                id="layerText"
                cols="30"
                rows="10"
                ref={textArea}
              />
            )
          }
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
  openHandler: PropTypes.func,
  handler: PropTypes.func
};

export default hot(Layer);
