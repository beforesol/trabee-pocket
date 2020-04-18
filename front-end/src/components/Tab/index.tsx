import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { NEW_ROUTER_ID } from '@pages/Home';

const style = require('./index.scss');
const cx = classNames.bind(style);

export const TAB_INFO = {
  PROFILE: {
    name: 'profile',
    className: 'profile',
    text: '여행 프로필'
  },
  CURRENCY: {
    name: 'currency',
    className: 'currency',
    text: '화폐 & 예산'
  },
  EXPENSE: {
    name: 'expense',
    className: 'expense',
    text: '지출목록'
  },
  REPORT: {
    name: 'report',
    className: 'report',
    text: '리포트'
  }
};

interface IOwnProps {
  match: any
  activeTab: any
  updateTab: any
  onClickSpending: any
  onClickIncome: any
}

const Tab: React.FC<IOwnProps> = ({
  match,
  activeTab,
  updateTab,
  onClickSpending,
  onClickIncome,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [showLayer, setShowLayer] = useState(false);

  const handleAddExpense = () => {
    setShowLayer(true);
    console.log('handle Add Expense');
  };

  const handleCloseLayer = () => {
    setShowLayer(false);
  };

  const handleClickIncome = () => {
    console.log('handleClickIncome');
    setShowLayer(false);
    onClickIncome(true);
  };

  const handleClickSpending = () => {
    console.log('handleClickSpending');
    setShowLayer(false);
    onClickSpending(true);
  };

  useEffect(() => {
    const itemArray: any[] = [];

    Object.values(TAB_INFO).forEach((item, index) => {
      if (index === 2) {
        itemArray.push(
          <div className={cx('btn_tab', 'btn_add')} key={'+'}>
            <button
              disabled={match.params.id === NEW_ROUTER_ID}
              type="button"
              onClick={handleAddExpense}
              className={cx('btn')}><span className={cx('btn_text')}>+</span></button>
          </div>
        );
      }

      itemArray.push(
        <div className={cx('btn_tab', item.className)} key={item.name}>
          <button
            disabled={match.params.id === NEW_ROUTER_ID}
            className={cx('btn')}
            type="button"
            onClick={() => updateTab(item.name)}
            aria-selected={item.name === activeTab}
          >
            <span className={cx('text')}>
              {item.text}
            </span>
          </button>
        </div>
      );
    });

    setItems(itemArray);
  }, [match, activeTab]);

  return (
    <div className={cx('tab')}>
      <div className={cx('btn_area')}>
        {items}
      </div>
      {showLayer && (
        <div className={cx('layer')}>
          <div className={cx('layer_inner')}>
            <div className={cx('btn_wrap')}>
              <button type="button" className={cx('btn_layer', 'income')} onClick={handleClickIncome}><span className={cx('text')}>수입</span></button>
              <button type="button" className={cx('btn_layer', 'spending')} onClick={handleClickSpending}><span className={cx('text')}>지출</span></button>
            </div>
            <button type="button" className={cx('btn_close')} onClick={handleCloseLayer}><span className={cx('blind')}>닫기</span></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default hot(Tab);
