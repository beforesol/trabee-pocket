import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./layer.scss');
const cx = classNames.bind(style);

export const LAYER_TYPE = {
  INPUT: 'INPUT',
  TEXT: 'TEXT'
};

interface IOwnProps {
  layerType: any
  title: any
  openHandler: any
  handler: any
  text: any
}

const Layer: React.FC<IOwnProps> = ({ layerType, title, openHandler, handler, text }) => {
  const textArea = useRef<any>(null);

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

  useEffect(() => {
    if (!isTextContent) {
      textArea.current.focus();
      textArea.current.value = text;
    }
  });

  const isTextContent = layerType === LAYER_TYPE.TEXT;

  return (
    <div className={cx('layer')}>
      <div className={cx('inner')}>
        <div className={cx('content_area')}>
          <p className={cx('title')}>{title}</p>
          {
            isTextContent ? (
              <div className={cx('text')}>{text}</div>
            ) : (
                <textarea
                  className={cx('textarea')}
                  name="text"
                  id="layerText"
                  cols={30}
                  rows={10}
                  ref={textArea}
                />
              )
          }
        </div>
        <div className={cx('button_area')}>
          <button className={cx('btn', 'btn_close')} onClick={handleClose}>취소</button>
          <button className={cx('btn', 'btn_submit')} onClick={handleSumbit}>완료</button>
        </div>
      </div>
    </div>
  );
};

export default hot(Layer);
