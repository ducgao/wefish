import React from 'react'
import {
  View,
  Text
} from 'react-native'

import NTInput from '../../component/NTInput'
import NTButton from '../../component/NTButton'
import AppRepository from '../../core/AppRepository'

export default class ApplyToken extends React.PureComponent {

  appRepository = AppRepository.instance()

  applyToken = () => {
    this.appRepository.fetchPairList()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <NTInput ref={r => this.nameInput = r} placeholder="Token"/>
        <NTButton
          style={{ 
            marginTop: 12,
            alignSelf: 'center'
          }} 
          title="Đăng ký token" 
          onPress={this.applyToken}
        />
      </View>
    )
  }
}