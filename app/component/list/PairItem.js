import React from 'react'
import {
  TouchableOpacity,
  Text
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class PairItem extends React.PureComponent {

  onPress = () => {
    if (this.props.onPress) {
      let data = this.props.data
      this.props.onPress(data)
    }
  }

  render() {
    return (
      <TouchableOpacity style={{
        backgroundColor: '#ECD4FF',
        height: 44,
        borderRadius: 6,
        marginBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center'
      }} activeOpacity={0.7} onPress={this.onPress}>
        <Text style={{
          fontSize: 14,
          fontWeight: '500'
        }}>VND - USD</Text>
        <Ionicons 
          style={{
            position: 'absolute',
            right: 12
          }}
          size={20}
          name="ios-arrow-forward"
        />
      </TouchableOpacity>
    )
  }
}