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

    componentDidMount(){
        let miMeGusta = this.props.postData.likes.includes(auth.currentUser.email)
        if(miMeGusta){
            this.setState({
                propioLike: true
            })
        }
    }

    like(){
        db.collection('post').doc(this.props.id).update({
          likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
          this.setState({
            propioLike:true,
            cantidadDeLikes: this.state.cantidadDeLikes + 1
          })
        })
        .catch(err => console.log(err))
    
      }

      unlike(){
        db.collection('post').doc(this.props.id).update({
          likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
          this.setState({
            propioLike:false,
            cantidadDeLikes: this.state.cantidadDeLikes - 1
          })
        })
        .catch(e => console.log(e))
      }



    render() {
        return (
            <View>
            </View>
        )
    }
}


export default unPost