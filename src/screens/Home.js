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
        db.collection('posts').orderBy('createdAt', 'desc').limit(15).onSnapshot(
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
            <View style={styles.container3}>
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
    container2:{
        flex:3,
        backgroundColor: 'rgb(128,128,128)'
      },
    textoBtn: {
        color:"white",

    }
})
export default Home
