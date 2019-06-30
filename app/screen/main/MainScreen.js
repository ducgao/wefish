import React from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ApplyToken from './ApplyToken'
import PairList from './PairList'

const windowSize = Dimensions.get('window')
const initLayout = {
  width: windowSize.width,
  height: windowSize.height
}

export default class MainScreen extends React.PureComponent {
  static navigationOptions = { header: null }

  titles = [
    'Nhập Token',
    'Cặp Tiền Tệ'
  ]

  icons = [
    'ios-person',
    'ios-analytics'
  ]

  state = {
    index: 1,
    routes: [
      { index: 0, key: 'applytoken', title: this.titles[0] },
      { index: 1, key: 'pairlist', title: this.titles[1] }
    ]
  }

  constructor(props) {
    super(props)
    this.applyTokenInstance = () => <ApplyToken 
      navigation={this.props.navigation} 
    />
    this.pairListInstance = () => <PairList 
      navigation={this.props.navigation} 
    />
  }

  onTabIndexChanged = (nextIndex) => {
    this.setState({ index: nextIndex })
  }

  renderLabel = (props) => {
    const route = props.route
    const iconColor = this.state.index == route.index ? 'white' : 'gray'
    const iconName = this.icons[route.index] 
    const iconTitle = this.titles[route.index] 

    return this.renderTabIcon(iconTitle, iconName, iconColor)
  }

  renderTabIcon(title, iconName, iconColor) {
    const textStyle = {
      fontSize: 12,
      color: iconColor, 
      alignSelf: 'center', 
      marginTop: 0
    }
    const iconStyle = {
      alignSelf: 'center'
    }
    return (
      <View style={{ height: 44, justifyContent: 'center'}}>
        <Ionicons
          style={iconStyle}
          name={iconName}
          color={iconColor}
          size={30}
        />
        <Text numberOfLines={1} style={textStyle}>
          {title}
        </Text>
      </View>
    )
  }

  renderTabBar = (props) => {
    return <TabBar
      {...props}
      style={{ backgroundColor: '#84E3FF', height: 64 }}
      indicatorStyle={{ backgroundColor: null }}
      renderLabel={this.renderLabel}
    />
  }

  render() {
    const scene = {
      applytoken: this.applyTokenInstance,
      pairlist: this.pairListInstance
    }
    return (
      <TabView
        swipeEnabled={false}
        tabBarPosition={'bottom'}
        navigationState={this.state}
        onIndexChange={this.onTabIndexChanged}
        renderTabBar={this.renderTabBar}
        initialLayout={initLayout}
        renderScene={SceneMap(scene)}
      />
    )
  }
}