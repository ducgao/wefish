import React, { PureComponent } from 'react'
import {
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform
} from 'react-native'

const isIos = Platform.OS == 'ios'
export default class NTButton extends PureComponent {

  _renderContent() {
    if (this.props.loading) {
      return <ActivityIndicator size='small' color='white' />
    }
    else {
      return <Text style={{
        height: isIos ? 16 : null,
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center'
      }} >{this.props.title.toUpperCase()}</Text>
    }
  }

  render() {
    const windowWidth = Dimensions.get('window').width
    const baseContainerStyle = {
      width: '50%',
      height: 44,
      backgroundColor: '#65BEFF',
      borderRadius: 8,
      justifyContent: 'center',
      elevation: 8
    }
    return(
      <TouchableOpacity style={[baseContainerStyle, this.props.style]} activeOpacity={0.7} onPress={this.props.onPress}>
        {this._renderContent()}
      </TouchableOpacity>
    )
  }
}