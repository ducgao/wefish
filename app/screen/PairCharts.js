import React from 'react'
import {
  View,
  Dimensions, 
  Text, 
  ActivityIndicator,
  TouchableOpacity,
  Button
} from 'react-native'
import PhotoView from 'react-native-photo-view'
import Carousel from 'react-native-snap-carousel'
import Api from '../api'
import Icon from 'react-native-vector-icons/Ionicons'

const itemWidth = Dimensions.get('window').width
const itemHeight = Dimensions.get('window').height

var refreshBridge = null

export default class PairCharts extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerRight: (
      <TouchableOpacity 
        style={{ marginRight: 16 }}
        onPress={() => { if (refreshBridge) refreshBridge() }}>
        <Icon name="ios-refresh" color="#FFABAB" size={24} />
      </TouchableOpacity>
    )
  })

  state = {
    currentImageIndex: null,
    presentTitle: null,
    images: null
  }

  api = Api.instance()
  
  componentDidMount() {
    refreshBridge = this.refresh

    const url = this.props.navigation.getParam("url")
    this.api.getPairCharts(url).then(images => {
      this.setState({
        currentImageIndex: 0,
        presentTitle: images[0].title,
        images 
      })
    })
  }

  refresh = () => {
    setTimeout(() => {
      const url = this.props.navigation.getParam("url")
      const currentIndex = this.state.currentImageIndex
      this.api.getPairCharts(url).then(images => {
        this.setState({ 
          presentTitle: images[currentIndex].title,
          images 
        })
      })
    }, 1000)
  }

  onSnapToItem = (index) => {
    let presentTitle = this.state.images[index].title
    this.setState({ 
      currentImageIndex: index,
      presentTitle 
    })
  }

  slideToNext = () => {
    this.carousel.snapToNext(true)
  }

  slideToPrevious = () => {
    this.carousel.snapToPrev(true)
  }

  pressNo = () => {
    let currentImage = this.state.images[this.state.currentImageIndex]
    this.api.justCall(currentImage.buttonNoUrl)
    this.refresh()
  }

  pressBuy = () => {
    let currentImage = this.state.images[this.state.currentImageIndex]
    this.api.justCall(currentImage.buttonBuyOnlyUrl)
    this.refresh()
  }

  pressSell = () => {
    let currentImage = this.state.images[this.state.currentImageIndex]
    this.api.justCall(currentImage.buttonSellOnlyUrl)
    this.refresh()
  }

  pressAll = () => {
    let currentImage = this.state.images[this.state.currentImageIndex]
    this.api.justCall(currentImage.buttonALlInUrl)
    this.refresh()
  }

  renderAction(title, enable, action) {
    return (
      <TouchableOpacity style={{
        flex: 1,
        height: 60,
        justifyContent: 'center'
      }} onPress={action}>
        <View style={{
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: enable ? '#FFABAB' : '#b8b8b8',
          height: 60,
          width: 60
        }}>
          <Text style={{
            alignSelf: 'center',
            textAlign: 'center',
            paddingLeft: 16,
            paddingRight: 16
          }}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderActions() {
    let currentImage = this.state.images[this.state.currentImageIndex]
    return (
      <View style={{ 
        position: 'absolute',
        bottom: 80,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
      }} >
        {this.renderAction("No", currentImage.buttonNo, this.pressNo)}
        {this.renderAction("Buy Only", currentImage.buttonBuyOnly, this.pressBuy)}
        {this.renderAction("Sell Only", currentImage.buttonSellOnly, this.pressSell)}
        {this.renderAction("All In", currentImage.buttonAllIn, this.pressAll)}
      </View>
    )
  }

  renderPagination() {
    const paging = this.state.paging
    const currentImageIndex = this.state.currentImageIndex
    const totalImages = this.state.images.length
    return <Text
      key="pagination"
      style={{
        alignSelf: 'center',
        color: 'white',
        textAlign: 'center',
        height: 30,
        fontSize: 18,
      }}
    >
      {(currentImageIndex + 1) + "/" + totalImages}
    </Text>
  }

  renderImageButton(name, left, right, action) {
    return <TouchableOpacity style={{ 
      position: 'absolute',
      width: 44,
      height: 44,
      left,
      right,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center'
    }} 
    activeOpacity={0.7}
    onPress={action}
    >
      <Icon name={name} size={36} color="white"/>
    </TouchableOpacity>
  }

  renderController() {
    const itemWidth = Dimensions.get('window').width
    return <View style={{
      position: 'absolute',
      alignSelf: 'center',
      bottom: 16,
      backgroundColor: '#ACE7FF',
      width: itemWidth - 16 * 2,
      height: 44,
      fontSize: 18,
      paddingTop: 2,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center'
    }}>
      {this.renderImageButton("ios-arrow-back", 0, null, this.slideToPrevious)}
      {this.renderPagination()}
      {this.renderImageButton("ios-arrow-forward", null, 0, this.slideToNext)}
    </View>
  }

  renderItem = ({item, index}) => {
    return <PhotoView
      style={{
        width: '100%',
        height: Dimensions.get('window').height - 280
      }}
      source={{
        uri: item.imageUrl
      }}
      maximumZoomScale={4}
    />
  }

  renderContentCarousel() {
    return (
      <View>
        <Text style={{
          backgroundColor: '#ACE7FF',
          marginTop: 8,
          marginBottom: 8,
          marginLeft: 16,  
          marginRight: 16,
          height: 32,
          textAlign: 'center',
          textAlignVertical: 'center'
        }}>{this.state.presentTitle}</Text>
        <Carousel
          ref={(c) => { this.carousel = c }}
          data={this.state.images}
          renderItem={this.renderItem}
          sliderWidth={itemWidth}
          itemWidth={itemWidth}
          onSnapToItem={this.onSnapToItem}
        />
      </View>
    ) 
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
    const actions = this.renderActions()
    const controller = this.renderController()

    return [carousel, actions, controller]
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View> 
    )
  }
}