import React from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native'

import PairItem from '../../component/list/PairItem'
import AppRepository from '../../core/AppRepository';

export default class PairList extends React.PureComponent {

  state = {
    pairlist: null
  }

  appRepository = AppRepository.instance()

  componentDidMount() {
    this.appRepository.addObserve(this.onDataChanged)
    this.appRepository.fetchPairList()
  }

  componentWillUnmount() {
    this.appRepository.removeObserve(this.onDataChanged)
  }

  onDataChanged = (pairlist) => {
    this.setState({ pairlist })
  }

  onPressItem = (item) => {
    this.props.navigation.navigate("PairCharts", { title: item.title, url: item.actionUrl })
  }

  keyExtractor = (item, index) => "pairlist-" + index

  renderItem = ({item}) => (
    <PairItem
      id={item.id}
      data={item}
      onPress={this.onPressItem}
    />
  )

  renderList() {
    if (this.state.pairlist == null) {
      return <ActivityIndicator color="black" style={{ flex: 1 }} />
    }

    if (this.state.pairlist.length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontStyle: 'italic', alignSelf: 'center' }}>Không tìm thấy dữ liệu</Text>
        </View>
      )
    }

    return (
      <FlatList
        style={{ flex: 1, marginTop: 12, paddingTop: 12, paddingBottom: 64 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        data={this.state.pairlist}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    ) 
  }

  render() {
    return (
      <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16 }}>
        <Text style={{ marginTop: 44, fontSize: 20, fontWeight: 'bold' }}>Cặp tiền tệ</Text>
        {this.renderList()}
      </View>
    )
  }
}