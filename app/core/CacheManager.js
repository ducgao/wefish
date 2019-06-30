import  {
  AsyncStorage
} from 'react-native'
import { API_CACHE_STORE_KEY } from '../common/Constants'
export default class CacheManager {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new CacheManager()
      }
      
      return this._instance
  }

  apiCacheData = {}

  constructor() {
    AsyncStorage.getItem(API_CACHE_STORE_KEY).then(res => {
      if (res) {
        this.apiCacheData = JSON.parse(res)
      }
      else {
        this.apiCacheData = {}
      }
    })
    .catch(_ => {
      this.apiCacheData = {}
    })
  }

  cacheApiResponse(method, body, headers, url, response) {
    const key = this._getKeyFrom(method, body, headers, url)
    const cacheValue = JSON.stringify(response)
    this.apiCacheData[key] = cacheValue
    AsyncStorage.setItem(API_CACHE_STORE_KEY, JSON.stringify(this.apiCacheData))
  }

  getApiCache(method, body, headers, url) {
    const key = this._getKeyFrom(method, body, headers, url)
    return this.apiCacheData[key]
  }

  _getKeyFrom(method, body, headers, url) {
    const methodString = JSON.stringify(method)
    const bodyString = body ? JSON.stringify(body) : "body"
    const headersString = JSON.stringify(headers)
    const urlString = JSON.stringify(url)

    return methodString + bodyString + headersString + urlString
  }
}