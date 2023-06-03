import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';
import unPost from '../components/unPost/unPost';

 class Home extends Component {
     constructor(props) {
         super(props)
         this.state = {
             posts: []
         }
     }

     componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posteos = []
                docs.forEach(doc => {
                    posteos.push({
                        id:doc.id,
                        data: doc.data()
                    }) 
                    this.setState({
                        posts: posteos
                    })
                })
            }
        )
     }

    render() {
        return (
            <View>
                <FlatList
                data={this.state.posts}
                keyExtractor={unPost => unPost.id.toString()}
                renderItem={({item}) => <unPost postData={item} navigation={this.props.navigation}/> }
                />

               

            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'green',
        borderRadius: 20,
        borderWidth: 2,
        textAlign: 'center',
        padding: 10,
        
    },
    textoBtn: {
        color:"white",

    }
})
export default Home
