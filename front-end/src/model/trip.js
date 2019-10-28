export default class Trip {
  constructor() {
    this.id = '';
    this.title = '';
    this.memo = '';
    this.country = null;
    this.startDate = '';
    this.endDate = '';
    this.currency = '';

    return this;
  }

  setData(info) {
    this.id = info.id || '';
    this.title = info.title || '';
    this.memo = info.memo || '';
    this.country = info.country || {};
    this.startDate = info.startDate || '';
    this.endDate = info.endDate || '';
    this.currency = info.currency || '';

    return this;
  }
}
