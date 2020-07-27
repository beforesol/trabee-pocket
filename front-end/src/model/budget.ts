export interface IBudgetInfo {
  _id: string
  tripId: string
  type: string
  title: string
  amount: any
  amountType: string
  currency: any
  category: any
  date: string
  day: string
}

export default class Budget {
  id: string
  tripId: string
  type: string
  title: string
  amount: string
  amountType: string
  currency: any
  category: string
  date: string
  day: string

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

  setData(info: IBudgetInfo) {
    this.id = info._id || '';
    this.tripId = info.tripId || '';
    this.type = info.type || '';
    this.title = info.title || '';
    this.amount = info.amount || '';
    this.amountType = info.amountType || '';
    this.currency = info.currency || null;
    this.category = info.category || null;
    this.date = info.date || '';
    this.day = info.day || '';

    return this;
  }
}
