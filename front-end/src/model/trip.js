export default class Trip {
  constructor(info) {
    this.id = info.id || 0;
    this.title = info.title || '';
    this.memo = info.memo || '';
    this.country = info.country || {};
    this.startDate = info.startDate || '';
    this.endDate = info.endDate || '';
    this.currency = info.currency || '';
  }
}
