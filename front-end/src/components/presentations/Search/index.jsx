import React, { useReducer, useCallback, useRef, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

const style = require('./search.scss');
const cx = classNames.bind(style);

function reducer(state, action) {
  switch (action.type) {
  case 'CHANGE':
    return {
      ...state,
      inputText: action.value
    };
  default:
    return state;
  }
}

const Search = () => {
  const searchInputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, {
    inputText: ''
  });
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    console.log(state.inputText);
  }, [searchText]);

  const _onSubmit = useCallback(() => {
    console.log('onSubmit');
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성

  const _onReset = () => {
    console.log('onReset');
  };

  return (
    <form
      role="search"
      id="searchForm"
      className={cx('search_form')}
      onSubmit={_onSubmit}>
      <div className={cx('input_wrap')}>
        <span className={cx('blind')}>search</span>
        <input
          type="text"
          name="query"
          placeholder="국가명 또는 국가 코드"
          className={cx('input')}
          ref={searchInputRef}
          autoFocus={true}
          autoComplete="off"
          onChange={() => {
            dispatch({ type: 'CHANGE', value: searchInputRef.current.value });
            setSearchText(searchInputRef.current.value);
          }}
        />
        <button
          type="button"
          className={cx('btn_reset')}
          onClick={_onReset}>
          <span className={cx('blind')}>delete</span>
        </button>
      </div>
    </form>
  );
};

export default hot(Search);
