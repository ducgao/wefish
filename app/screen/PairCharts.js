import React from 'react'
import {
  View,
  Dimensions, 
  Text, 
  ActivityIndicator
} from 'react-native'
import PhotoView from 'react-native-photo-view'
import Carousel from 'react-native-snap-carousel'
import Api from '../api';

const itemWidth = Dimensions.get('window').width
const itemHeight = Dimensions.get('window').height
export default class PairCharts extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  state = {
    images: null
  }

  api = Api.instance()
  
  componentDidMount() {
    this.api.getPairCharts().then(images => {
      this.setState({ images })
    })
  }

  renderItem = ({item, index}) => {
    return <PhotoView
      style={{
        width: Dimensions.get('window').width - (this.state.isMusicPlaying ? 60 : 0),
        height: Dimensions.get('window').height - 40 - 56 - 26 - 8 - 40
      }}
      source={{
        uri: item.imageUrl
      }}
      maximumZoomScale={4}
    />
  }

  renderContentCarousel() {
    return <Carousel
      ref={(c) => { this.carousel = c }}
      data={this.state.images}
      renderItem={this.renderItem}
      sliderWidth={itemWidth}
      itemWidth={itemWidth}
    />
  }

  renderContent() {
    if (this.state.images == null) {
      return <ActivityIndicator color="black" style={{ flex: 1 }} />
    }

    if (this.state.images.length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontStyle: 'italic', alignSelf: 'center' }}>Không tìm thấy dữ liệu</Text>
        </View>
      )
    }

    const carousel = this.renderContentCarousel()

    return carousel
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View> 
    )
  }
}