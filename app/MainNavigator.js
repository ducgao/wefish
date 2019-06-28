import React from 'react'

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'

import MainScreen from './screen/main/MainScreen'
import PairCharts from './screen/PairCharts'

const RootStack = createStackNavigator({
  MainScreen: { screen: MainScreen },
  PairCharts: { screen: PairCharts }
})

const App = createAppContainer(RootStack);

export default App