import { DUMMY_IMAGES } from '../dummy/images';

export interface ITripInfo {
  _id: string
  title: string
  memo: string
  country: any
  imageUrl: string;
  startDate: string
  endDate: string
  totalAmount: string;
}

export default class Trip {
  id: string
  title: string
  memo: string
  country: any
  imageUrl: string;
  startDate: string
  endDate: string
  totalAmount: string

  constructor() {
    this.id = '';
    this.title = '';
    this.memo = '';
    this.country = null;
    this.imageUrl = DUMMY_IMAGES[Math.floor(Math.random() * DUMMY_IMAGES.length)];
    this.startDate = '';
    this.endDate = '';
    this.totalAmount = '';

    return this;
  }

  setData(info: ITripInfo) {
    this.id = info._id || '';
    this.title = info.title || '';
    this.memo = info.memo || '';
    this.country = info.country || {};
    this.imageUrl = info.imageUrl || this.imageUrl;
    this.startDate = info.startDate || '';
    this.endDate = info.endDate || '';
    this.totalAmount = info.totalAmount || '';

    return this;
  }
}
