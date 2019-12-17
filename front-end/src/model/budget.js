export default class Budget {
  constructor() {
    this.id = '';
    this.tripId = '';
    this.type = '';
    this.title = '';
    this.amount = '';
    this.amountType = '';
    this.currency = null;
    this.category = '';
    this.date = '';
    this.day = '';

    return this;
  }

  setData(info) {
    this.id = info._id || '';
    this.tripId = info.tripId || '';
    this.type = info.type || '';
    this.title = info.title || '';
    this.amount = info.amount || {};
    this.amountType = info.amountType || '';
    this.currency = info.currency || null;
    this.category = info.category || null;
    this.date = info.date || '';
    this.day = info.day || '';

    return this;
  }
}
