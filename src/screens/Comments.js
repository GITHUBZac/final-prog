import { Text, View, FlatList, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react';
import FormComment from '../components/FormComment';
import UnPost from '../components/unPost/UnPost';
import { db, auth } from '../firebase/config';

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
    }

    componentDidMount() {
        db.collection('posts').doc(this.props.route.params.id).onSnapshot(doc => {
            this.setState({
                data: doc.data(),
            }), () => console.log(this.state.data.comentarios)
        })
    }

    render() {
        console.log(this.props);
        return (
            
            <View>
            {this.state.data?.comentarios?.length === 0 ?
                <View style={styles.texto}>
                  <Text style={styles.texto}>Aca podras ver todos los comentarios del posteo</Text>
                  <Text>
                    No hay comentarios!
                  </Text> 
                <FormComment idPost={this.props.route.params.id} />
                <Text onPress={() => this.props.navigation.navigate('Home')}>Volver al home</Text>
                </View>
            :
            <View>
                <Text style={styles.texto}>Aca podras ver todos los comentarios del posteo</Text>
                <FlatList
                    data={this.state.data.comentarios}
                    keyExtractor={item => item.createdAt.toString()}
                    renderItem={({ item }) => <Text>{item.comentario}</Text>}
                />
                <FormComment idPost={this.props.route.params.id} />
                <Text style={styles.login} onPress={() => this.props.navigation.navigate('Home')}>Volver al home</Text>
            </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    texto: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    login: {
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'left'
    },
})