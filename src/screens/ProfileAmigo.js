import {Text,View,TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React , {Component} from 'react'
import {auth, db} from '../firebase/config'
import Posteos from '../components/unPost/Posteos';

export default class ProfileAmigo extends Component{

    constructor(props){
        super(props)
        this.state={
          infoUser: '',
          props: props,
          posteos:[]
        }}

    componentDidMount(){
        console.log(this.props)
        db.collection('users')
        .where('owner', '==', this.props.route.params.email)
        .onSnapshot(
          docs => {
            let arrUser=[]
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
          })}



    render(){
        return(

            <View style= {styles.container} >
                {
                    this.state.infoUser !== '' 
                    ?
                    <>
                    <Text style= {styles.owner}>{this.state.infoUser.data.owner}</Text>,
                    <Text style= {styles.owner}>{this.state.infoUser.data.usuario}</Text>,
                    <Text> Cantidad de posteos: {this.state.posteos.length} </Text>,
                    <View style={styles.container3}><Posteos
                    data = {this.state.posteos}
                    navigation = {this.props.navigation}/> </View>
                    <Text> La biografia del usuario: {this.state.infoUser.data.bio}</Text>,
                    </>
                    :
                    null

                }
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
     backgroundColor: '#DCDCDD',
     flex:1
    },
    owner:{
      padding: 10,
      margin: 10,
      fontWeight: 'bold', 
      fontSize: 15,
      backgroundColor: 'black',
      borderRadius:10,
      color: 'white',
      textAlign: 'center',
    },
    container3: {
      fontFamily: 'monospace',
      color: 'rgb(0,0,0)',
      flex: 1
    }
   
  })
