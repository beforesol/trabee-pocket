import {
  sum,
} from './index';

describe('\n[sum 테스트]', () => {
  it('sum default', () => {
    expect(sum()).toEqual(0);
  });
  it('sum 1, 2', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
