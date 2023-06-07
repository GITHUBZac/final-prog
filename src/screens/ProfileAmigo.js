import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import UnPost from '../components/UnPost/UnPost'


export default class ProfileAmigo extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            mailFriend: props.route.params.mail,
            postsFriend: [],
            infoUser:{}
        }
    }

    componentDidMount() {
        db
            .collection('posts')
            .orderBy('createdAt' , 'desc')
            .where('owner', '==', this.state.mailFriend)
            .onSnapshot(docs => {
                let posts = []
                docs.forEach(doc => posts.push({
                    id: doc.id,
                    data: doc.data()
                }))
                this.setState({
                    postsFriend: posts
                }, () => console.log(this.state.postsFriend))
            })
        db.collection('users')
            .where('owner', '==', this.state.mailFriend)
            .onSnapshot(doc => {
                doc.forEach(doc =>
                    this.setState({
                        id: doc.id,
                        infoUser: doc.data()
                    }))

            })
    }
    render() {
        return (
            <>
                <Text style={styles.container0} >{this.state.infoUser.username}'s Profile</Text>


                <Text style={styles.container0}>{this.state.infoUser.username}</Text>
                <Text style={styles.container0}>{this.props.route.params.email}</Text>
                <Text style={styles.container0}>{this.state.infoUser.descripcion}</Text>
                <Text style={styles.container0}>{this.state.postsFriend.length}</Text>
                <Image 
                    source={{ uri: this.state.infoUser.imagen }}
                    resizeMode='contain' />
                    <View style={styles.container3}>

                    <FlatList
                    data={this.state.postsFriend}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <UnPost data={item.data} id={item.id} />} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
                /> 
                    </View>
                
                    </>
        )
    }
}

const styles = StyleSheet.create({
    container0:{
        fontFamily: 'monospace',
      },
    container1:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    container2:{
      flex:3
    },
    container3:{
    
        flex:5
      },
    image:{
      height:300
    }
  })