import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Posteos from '../components/unPost/Posteos';
import ProfileData from '../components/Profile/ProfileData';

export default class ProfileAmigo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoUser: '',
      props: props,
      posteos: []
    }
  }

  componentDidMount() {
    console.log(this.props)
    db.collection('users')
      .where('owner', '==', this.props.route.params.email)
      .onSnapshot(
        docs => {
          let arrUser = []
          docs.forEach(doc => {
            arrUser.push({
              id: doc.id,
              data: doc.data()
            })
            console.log(arrUser);
            this.setState({
              infoUser: arrUser[0]
            })
          })

          db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
              let arrPost = [];
              docs.forEach(doc => {
                arrPost.push({
                  id: doc.id,
                  data: doc.data()
                })
              })
              this.setState({
                posteos: arrPost
              })
            }
          )
        })
  }

  render() {
    return (
      <View style={styles.container} >
        {
          this.state.infoUser !== ''
            ?
            <>
            <div>
            <Text style={styles.container0}>Este es tu perfil!</Text>
            <li>
              <ul><Text style={styles.container3} > Bienvenido a tu perfil {this.state.infoUser.data.usuario}! </Text></ul>
              <ul><Text style={styles.container3}> La biografia del usuario: {this.state.infoUser.data.bio}</Text></ul>
              <ul><Text style={styles.container3}> Tu mail: {auth.currentUser.email} </Text> </ul>
              <ul><Text style={styles.container3}> Cantidad de posteos: {this.state.posteos.length} </Text> </ul>
              <ul><Text style={styles.container3}> Tu perfil se creo: {auth.currentUser.metadata.creationTime} </Text> </ul>
            </li>
          </div>
              <View style={styles.container3}><Posteos
                data={this.state.posteos}
                navigation={this.props.navigation} /> </View>
            </>
            :
            null
        }
        <Text style={styles.boton} ><ProfileData navigation={this.props.navigation} /></Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDD',
    flex: 1,
    alignItems: 'center'
  },
  owner: {
    padding: 10,
    margin: 10,
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
  },
  container3: {
    fontFamily: 'monospace',
    color: 'rgb(0,0,0)',
    flex: 1
  },

  container0: {
    fontFamily: 'monospace',
    color: 'rgb(0,0,0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

  }

})
