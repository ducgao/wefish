import React, { PureComponent } from 'react'
import {
  View,
  TextInput,
  Dimensions
} from 'react-native'

export default class NTInput extends PureComponent {

  state = {
    text: null
  }

  getText() {
    return this.state.text
  }

  render() {
    const windowWidth = Dimensions.get('window').width
    const baseContainerStyle = {
      width: windowWidth - 24 * 2,
      height: 48,
      marginLeft: 24,
      backgroundColor: '#d3d3d3EE',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      paddingLeft: 12,
      paddingRight: 12,
      justifyContent: 'center'
    }
    return(
      <View style={[baseContainerStyle, this.props.style]}>
        <TextInput 
          style={{
            padding: 0,
            textAlignVertical: 'center',
            color: this.props.textColor ? this.props.textColor : 'white'
          }}
          keyboardType={this.props.inputType === "phone" ? "phone-pad" : null}
          secureTextEntry={this.props.inputType === "password"}
          placeholder={this.props.placeholder} 
          placeholderTextColor={this.props.textColor ? this.props.textColor : 'white'}
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
          onSubmitEditing={this.props.onSubmitEditing}
        />
      </View>
    )
  }
}