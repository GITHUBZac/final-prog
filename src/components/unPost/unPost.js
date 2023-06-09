import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { auth, db } from '../../firebase/config'
import firebase from 'firebase'
import { FontAwesome, EvilIcons, Ionicons } from '@expo/vector-icons'


class UnPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidadDeLikes: this.props.postData.data.likes.length,
      propioLike: false,
      comentarios: this.props.postData.data.comentarios,
      cantidadDeComentarios: this.props.postData.data.comentarios.length,
    }
  }

  componentDidMount() {
    let miMeGusta = this.props.postData.data.likes.includes(auth.currentUser.email)
    if (miMeGusta) {
      this.setState({
        propioLike: true
      })
    }
  }

  like() {
    db.collection('posts').doc(this.props.postData.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
      .then(() => {
        this.setState({
          propioLike: true,
          cantidadDeLikes: this.state.cantidadDeLikes + 1
        })
      })
      .catch(err => console.log(err))

  }

  unlike() {
    db.collection('posts').doc(this.props.postData.id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
      .then(() => {
        this.setState({
          propioLike: false,
          cantidadDeLikes: this.state.cantidadDeLikes - 1
        })
      })
      .catch(e => console.log(e))
  }



  borrarPost() {
    db.collection("posts")
      .doc(this.props.postData.id)
      .delete({})
      .then(() => {
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <View style={styles.bordeImg}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ProfileAmigo',
            {
              email: this.props.postData.data.owner
            })}>
          <Text style={styles.textoOwner}><Ionicons name="person" size={18} color="black" /> {this.props.postData.data.owner}</Text></TouchableOpacity>

        <Image
          style={styles.imagen}
          source={{ uri: this.props.postData.data.imagen }}
          resizeMode='cover'
        />
        <Text style={styles.descripcion}>{this.props.postData.data.descripcion}</Text>
        <View style={styles.contenedorLikes}>
        <Text style={styles.descripcion}> Cantidad de Likes: {this.state.cantidadDeLikes}</Text>
        <View style={styles.corazon}>
          {
            this.state.propioLike ?
              <TouchableOpacity
                onPress={() => this.unlike()}
              >
                <FontAwesome
                  name='heart'
                  size={24}
                  color='red'
                />
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => this.like()}
              >
                <FontAwesome
                  name='heart-o'
                  size={24}
                  color='red'
                />
              </TouchableOpacity>
          }
        </View>
        <View style={styles.borrarPost}>
        {this.props.postData.data.owner === auth.currentUser.email ? (
            <TouchableOpacity onPress={() => this.borrarPost()}>
              <FontAwesome name="trash-o" size={24} color="black" />
            </TouchableOpacity>
          ) : null}
          </View>
        </View>
        <Text style={styles.descripcion}> Cantidad de Comentarios: {this.state.cantidadDeComentarios}</Text>
        <Text style={styles.descripcion} onPress={() => this.props.navigation.navigate('Comments', { id: this.props.postData.id })}>Ver Comentarios <EvilIcons name="comment" size={24} color="black" /></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imagen: {
    height: 400,
    width: 400,
    alignItems: 'center',
  },
  descripcion: {
    fontFamily: 'monospace',
  },
  bordeImg: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    margin: 20
  },
  textoOwner: {
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  contenedorLikes: {
    flex: 3,
    flexDirection: 'row'
  }, 
  corazon: {
    marginLeft: 10
},
  borrarPost: {
       marginLeft: 10
  }
})


export default UnPost