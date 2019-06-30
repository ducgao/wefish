import Base from "./Base"
import { PAIR_LIST } from './Endpoints'
import {
  PAIR_CHARTS
} from './Fakedata'
import PairList from "./binder/PairList";

export default class Api extends Base {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new Api()
      }
      
      return this._instance
  }

  getPairList() {
    let binder = new PairList()
    return this.callGet(PAIR_LIST, binder)
  }

  getPairCharts(url) {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(PAIR_CHARTS)
      }, 1000)
    })
  }
}