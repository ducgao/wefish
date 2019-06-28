import Api from "../api";

export default class AppRepository {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new AppRepository()
      }
      
      return this._instance
  }

  api = Api.instance()

  observers = []
  pairList = []

  addObserve = (o) => {
    this.observers.push(o)
    o(this.pairList)
  }

  removeObserve = (o) => {
    let indexToDelete = this.observers.indexOf(o)
    this.observers.splice(indexToDelete, 1)
  }
  
  notify() {
    this.observers.forEach(o => {
      o(this.pairList)
    })
  }

  fetchPairList = () => {
    this.pairList = null
    this.notify()
    
    this.api.getPairList().then(list => {
      this.pairList = list
      this.notify()
    })
  }
}