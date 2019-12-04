import { DUMMY_IMAGES } from '../dummy/images';

export default class Trip {
  constructor() {
    this.id = '';
    this.title = '';
    this.memo = '';
    this.country = null;
    this.imageUrl = DUMMY_IMAGES[Math.floor(Math.random() * DUMMY_IMAGES.length)];
    this.startDate = '';
    this.endDate = '';

    return this;
  }

  setData(info) {
    this.id = info.id || '';
    this.title = info.title || '';
    this.memo = info.memo || '';
    this.country = info.country || {};
    this.imageUrl = info.imageUrl || this.imageUrl;
    this.startDate = info.startDate || '';
    this.endDate = info.endDate || '';

    return this;
  }
}
