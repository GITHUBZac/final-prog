import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native'
import { auth, db } from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'


class unPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes: this.props.postData.data.likes.length,
            propioLike: false,
            comentarios : this.props.postData.data.comentarios
        }
    }


    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}


export default unPost