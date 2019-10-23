import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

const style = require('./search.scss');
const cx = classNames.bind(style);

class Search extends React.PureComponent {
  searchInputRef = React.createRef();


  _onSubmit = () => {
    console.log('onSubmit');
  }

  _onReset = () => {
    console.log('onReset');
  }

  render() {
    return (
      <form
        role="search"
        id="searchForm"
        className={cx('search_form')}
        onSubmit={this._onSubmit}>
        <div className={cx('input_wrap')}>
          <span className={cx('blind')}>search</span>
          <input
            type="text"
            name="query"
            placeholder="국가명 또는 국가 코드"
            className={cx('input')}
            ref={this.searchInputRef}
            autoFocus={true}
            autoComplete="off"
          />
          <button
            type="button"
            className={cx('btn_reset')}
            onClick={this._onReset}>
            <span className={cx('blind')}>delete</span>
          </button>
        </div>
      </form>
    );
  }
}

export default hot(Search);
