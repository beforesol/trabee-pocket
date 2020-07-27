import React, { useEffect, useRef, Children } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

const style = require('./layer.scss');
const cx = classNames.bind(style);

export const LAYER_TYPE = {
  INPUT: 'INPUT',
  TEXT: 'TEXT',
  COMPONENT: 'COMPONENT'
};

interface IOwnProps {
  layerType: string
  title?: any
  openHandler: (isOpen: boolean) => void
  handler: (text?: string) => void
  text?: any
  children?: any
}

const Layer: React.FC<IOwnProps> = ({
  layerType,
  title,
  openHandler,
  handler,
  text,
  children
}) => {
  const textArea = useRef<any>(null);

  const handleClose = () => {
    openHandler(false);
  };

  const handleSumbit = () => {
    if (layerType === LAYER_TYPE.INPUT) {
      const newText = textArea.current.value;

      handler(newText);
    } else {
      handler();
    }

    openHandler(false);
  };

  useEffect(() => {
    if (layerType === LAYER_TYPE.INPUT) {
      textArea.current.focus();
      textArea.current.value = text;
    }
  });

  return (
    <div className={cx('layer')}>
      <div className={cx('inner')}>
        <div className={cx('content_area')}>
          {title && (
            <p className={cx('title')}>{title}</p>
          )}
          {layerType === LAYER_TYPE.TEXT && (
            <div className={cx('text')}>{text}</div>
          )}
          {layerType === LAYER_TYPE.INPUT && (
            <textarea
              className={cx('textarea')}
              name="text"
              id="layerText"
              cols={30}
              rows={10}
              ref={textArea}
            />
          )}
          {layerType === LAYER_TYPE.COMPONENT && children && (
            <>
              {children}
            </>
          )}
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
