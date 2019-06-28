import React from 'react'
import {
  View,
  Text,
  FlatList
} from 'react-native'

import PairItem from '../../component/list/PairItem'

export default class PairList extends React.PureComponent {

  onPressItem = (item) => {
    this.props.navigation.navigate("PairCharts", { title: 'VND - USD' })
  }

  keyExtractor = (item, index) => "pairlist-" + index

  renderItem = ({item}) => (
    <PairItem
      id={item}
      data={item}
      onPress={this.onPressItem}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16 }}>
        <Text style={{ marginTop: 44, fontSize: 20, fontWeight: 'bold' }}>Cặp tiền tệ</Text>
        <FlatList
          style={{ flex: 1, marginTop: 12, paddingTop: 12 }}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}