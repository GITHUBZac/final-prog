import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { Component } from 'react'
import ProfileData from '../components/Profile/ProfileData'
import { db, auth } from '../firebase/config'
import UnPost from '../components/unPost/UnPost';
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allPosts: [],
      infoUser: {},
      id: '',
    }
  }
  componentDidMount() {
    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posts1 = []
        docs.forEach(doc => {
          posts1.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          allPosts: posts1
        })
      })

    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(doc => {
        doc.forEach(doc =>
          this.setState({
            id: doc.id,
            infoUser: doc.data()
          }))
      }), () => console.log(this.state.infoUser)
  }

  render() {
    return (
      <View style={styles.contenedor}>
        <>
          <div>
            <Text style={styles.container0}>Este es tu perfil!</Text>
            <li>
            <ul><Text style={styles.container3}> Tu perfil se creo: {auth.currentUser.metadata.creationTime} </Text> </ul>
              <ul><Text style={styles.container3} > Bienvenido a tu perfil {this.state.infoUser.usuario}! </Text></ul>
              <ul><Text style={styles.container3}> 
              
              <Image
              style={styles.image}
              source={{ uri: this.state.infoUser.fotoPerfil }} 
              resizeMode='cover'
              />

               </Text> </ul> 
              
              <ul><Text style={styles.container3}> La biografia del usuario: {this.state.infoUser.bio}</Text></ul>
              <ul><Text style={styles.container3}> Tu mail: {auth.currentUser.email} </Text> </ul>
              <ul><Text style={styles.container3}> Cantidad de posteos: {this.state.allPosts.length} </Text> </ul>
              <ul><Text style={styles.container3}> Tu perfil se creo: {auth.currentUser.metadata.creationTime} </Text> </ul>
              
            </li>
          </div>
          <View style={styles.container4}> <FlatList
            data={this.state.allPosts}
            keyExtractor={UnPost => UnPost.id.toString()}
            renderItem={({ item }) => <UnPost postData={item} navigation={this.props.navigation} />} />
          </View>
          <Text style={styles.boton} ><ProfileData navigation={this.props.navigation} /></Text>
        </>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: 'black',
    alignItems: 'center',
    flex: 1
  },

  container0: {
    fontFamily: 'monospace',
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 3
  },
  container3: {
    fontFamily: 'monospace',
    color: 'white',
    flex: 5
  },
  container4: {
    fontFamily: 'monospace',
    backgroundColor: 'grey',
    flex: 5

  },
  image: {

    height: 300,
    width: 300,
  
   
  },
  boton: {
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 15,
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'white',
    borderRadius: 20,
    textAlign: 'center',
    padding: 5

  },
  
  
})

export default Profile