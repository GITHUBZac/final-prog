import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native'
import { auth, db } from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'


class MiPosteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes: this.props.postData.data.likes.length,
            propioLike: false,
            comentarios : this.props.postData.data.comentarios
        }
    }

    componentDidMount(){
        let miMeGusta = this.props.postData.data.likes.includes(auth.currentUser.email)
        if(miMeGusta){
            this.setState({
                propioLike: true
            })
        }
    }

    like(){
        db.collection('posts').doc(this.props.postData.id).update({
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
        db.collection('posts').doc(this.props.postData.id).update({
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

              <Image
                style = {styles.imagen}
                source = {{uri: this.props.postData.data.imagen}}
                resizeMode = 'cover'
              />
            <Text>{this.props.postData.data.descripcion}</Text>

          <View>
            {
          this.state.propioLike ?
          <TouchableOpacity
          onPress={()=> this.unlike()}
          >
            <FontAwesome
            name='heart'
            size={24}
            color='red'
            />
          </TouchableOpacity>
          :
          <TouchableOpacity
          onPress={()=> this.like()}
          >
            <FontAwesome
            name='heart-o'
            size={24}
            color='red'
            />
          </TouchableOpacity>
        }


          </View>




          
        <TouchableOpacity onPress={()=> this.deletePost()}> <Text>Borrar Post</Text> </TouchableOpacity>
        






            </View>
        )
    }
}

const styles  = StyleSheet.create({
  imagen:{
  height: 400,
  width: 400, 
  alignItems: 'center',
  }
})


export default MiPosteo