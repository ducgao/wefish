import { AsyncStorage } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { ACCESS_TOKEN_STORE_KEY } from '../common/constants'
import CacheManager from '../core/cachemanager'

export default class Base {
  navigation = null
  accessToken = null
  uciEmail = null
  uciPassword = null

  cacheManager = CacheManager.instance()

  setAccessToken(token) {
    this.accessToken = token

    if (token) {
      AsyncStorage.setItem(ACCESS_TOKEN_STORE_KEY, token)  
    }
    else {
      AsyncStorage.removeItem(ACCESS_TOKEN_STORE_KEY)
    }
  }

  getAccessToken() {
    return this.accessToken
  }

  callPost(url, body, binder) {
    return this.call('POST', url, body, binder)
  }

  callGet(url, binder) {
    return this.call('GET', url, null, binder)
  }

  call(method, url, body, binder) {
    const headers = this.accessToken == null ? {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    } : {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + this.accessToken
    }

    const getConfigs = { method, headers }
    const postConfigs = body ? { ...getConfigs, body } : getConfigs
    const configs = method == 'POST' ? postConfigs : getConfigs

    return new Promise((resolve, rejecter) => {
      fetch(url, configs)
      .then(response => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then(([code, data]) => {
        if (code == 401) {
          this._clearApp()
        } else if (code == 200) {
          this.cacheManager.cacheApiResponse(method, body, headers, url, data)
          resolve(binder.bind(data))
        }
        rejecter(code)
      })
      .catch(e => {
        const cacheValue = this.cacheManager.getApiCache(method, body, headers, url)
        if (cacheValue) {
          resolve(binder.bind(JSON.parse(cacheValue)))
        }
        else {
          rejecter(e)
        }
      })
    })
  }
}