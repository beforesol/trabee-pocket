import React, { useCallback, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  handleChangeInput: (value: any) => void;
  handleResetInput: (value: string) => void;
}

const Search: React.FC<IOwnProps> = ({ handleChangeInput, handleResetInput }) => {
  const [searchText, setSearchText] = useState('');

  const onChange = (e: any) => {
    setSearchText(e.currentTarget.value);
    handleChangeInput(e.currentTarget.value);
  };

  const onSubmit = useCallback(() => {
    console.log('onSubmit');
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성

  const _onReset = () => {
    setSearchText('');
    handleResetInput('');
  };

  return (
    <form
      role="search"
      id="searchForm"
      className={cx('search_form')}
      onSubmit={onSubmit}>
      <div className={cx('input_wrap')}>
        <span className={cx('blind')}>search</span>
        <input
          type="text"
          name="query"
          placeholder="국가명 또는 국가 코드"
          className={cx('input')}
          value={searchText}
          autoFocus={true}
          autoComplete="off"
          onChange={e => onChange(e)}
        />
        {
          searchText && (
            <button
              type="button"
              className={cx('btn_reset')}
              onClick={_onReset}>
              <span className={cx('blind')}>delete</span>
            </button>
          )
        }
      </div>
    </form>
  );
};

export default hot(Search);
