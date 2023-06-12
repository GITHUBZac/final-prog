import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Posteos from '../components/unPost/Posteos';
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').limit(15).onSnapshot(
            docs => {
                let posteos = []
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posteos
                    })
                })
            }
        )
            , () => console.log(this.state.posts)
    }

    render() {
        return (
            <View style={styles.container2}>
                <Posteos
                    data={this.state.posts}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container2: {
        flex: 3,
        backgroundColor: '#DCDCDD',
        alignItems: 'center'

        
    },
    textoBtn: {
        color: "white",

    }
})
export default Home
