import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default class Tab extends Component {
  static defaultProps = {
    unusedProp: 'ok',
    usedProp: 'will be null',
  }

  componentDidMount () {
    console.log(this.props)
  }

  render() {
    return (
      <View className='tab'>
        Tab
        {this.props.usedProp}
      </View>
    )
  }
}
