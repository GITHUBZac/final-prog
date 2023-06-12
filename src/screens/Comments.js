import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Comments extends Component {
    constructor(props){
        super(props)

    }
  
    render() {
    console.log(this.props);
    return (
      <View>
        <Text>Comments</Text>
      </View>
    )
  }
}