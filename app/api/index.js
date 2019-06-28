import Base from "./base"
import {
  PAIR_LIST,
  PAIR_CHARTS
} from './fakedata'

export default class Api extends Base {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new Api()
      }
      
      return this._instance
  }

  getPairList() {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(PAIR_LIST)
      }, 1000)
    })
  }

  getPairCharts(url) {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(PAIR_CHARTS)
      }, 1000)
    })
  }
}