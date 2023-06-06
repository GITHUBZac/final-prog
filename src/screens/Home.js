import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';
import UnPost from '../components/UnPost/UnPost'

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
            <View style={styles.container2}>
                <FlatList
                data={this.state.posts}
                keyExtractor={UnPost => UnPost.id.toString()}
                renderItem={({item}) => <UnPost postData={item} navigation={this.props.navigation}/> }
                />

               

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container2:{
        flex:3,
        backgroundColor: 'white'
      },
    textoBtn: {
        color:"white",

    }
})
export default Home
