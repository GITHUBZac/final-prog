import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, {Component} from 'react'
import ProfileData from '../components/Profile/ProfileData'
import {db,auth} from '../firebase/config'
import MiPosteo from '../components/MiPosteo/MiPosteo';

class Profile extends Component {

    constructor(props){
      super(props)
      this.state = {
        allPosts: [],
        infoUser: {},
        id: '',
        loading: true
      }
    }
    componentDidMount() {

        db.collection('posts').where('owner', '==', auth.currentUser.email)
          .orderBy('createdAt')
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
            },
              () => console.log(this.state.allPosts)
            )
    
          })
    
        db.collection('users')
          .where('creador', '==', auth.currentUser.email)
          .onSnapshot(doc => {
            doc.forEach(doc =>
              this.setState({
                id: doc.id,
                infoUser: doc.data()
              }))
    
          })
    
    
      }
  
    /*componentDidMount(){
      db.collection('users').onSnapshot(
        docs => {
          let arrUsuarios = []
  
          docs.forEach(doc => arrUsuarios.push({
            id: doc.id,
            data: doc.data()
          }))
  
          this.setState({
            usuarios: arrUsuarios,
            loading:false
          })
        }
      )
    }*/
  
    render(){
      return (

        <View style={styles.contenedor}>
      <>
        <div>
          <Text style={styles.container0}>Este es tu perfil!</Text>
          <li>

            <ul><Text style={styles.container3} > Bienvenido a tu perfil {this.state.postData}! </Text></ul>
            <ul><Text style={styles.container3}> La biografia del usuario: {this.state.postData}</Text></ul>
            <ul><Text style={styles.container3}> Tu mail: {auth.currentUser.email} </Text> </ul>
            <ul><Text style={styles.container3}> Tu perfil se creo: {auth.currentUser.metadata.creationTime} </Text> </ul>
          </li>


          {/* <TouchableOpacity onPress={ () => this.eliminar()}>
                <Text>Eliminar perfil</Text>
            </TouchableOpacity> */}
        </div>
       {/*<View style={styles.container3}> <FlatList
          data={this.state.allPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <MiPosteo navigation={this.props.postData} data={item.data} id={item.id} />} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
        />  </View>*/}


  <Text style={styles.boton} ><ProfileData navigation={this.props.navigation} /></Text> 
      </>
      </View>
        /*<View>
          <Text>Aqui va a ir toda la infor y acciones de nuestro Profile</Text>
          <ProfileData navigation={this.props.navigation} />
          <FlatList
            data={this.state.usuarios}
            keyExtractor={ (item) => item.id.toString()}
            renderItem={({item}) => <Text>{item.data.owner}</Text>}
          />
        </View>*/
      )
    }

  }

  const styles = StyleSheet.create({
    contenedor:{
      backgroundColor: 'rgb(128, 128, 128)',
      flex: 1
  },
    
    container0: {
      fontFamily: 'monospace',
      color: 'rgb(0,0,0)',
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
      color: 'rgb(0,0,0)',
      flex: 5
    },
    image: {
      height: 300
    },
    boton: {
      fontFamily: 'monospace',
      fontSize: 16,
      margin: 15,
      backgroundColor: 'rgb(0, 0, 0)',
      color: 'rgb(128, 128, 128)',
      borderRadius: 20,
      textAlign: 'center',
      padding: 5
  
    }
})
  
  export default Profile