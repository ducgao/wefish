import React from 'react'
import {
  View
} from 'react-native'

export default class PairCharts extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  render() {
    return <View/>
  }
}