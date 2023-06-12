import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'
export default class FormComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: ''
        }
    }

    crearComentario(comentario) {
        db.collection('posts')
            .doc(this.props.idPost)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    comentario: comentario
                })
            })
    }

    render() {
        return (
            <View>
                <TextInput
                    keyboardType='default'
                    style={styles.input}
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario}
                    placeholder='Agrega tu comentario aquí'
                />
                <TouchableOpacity onPress={() => this.crearComentario(this.state.comentario)}>
                    <Text style={styles.buttonText}>Apreta para comentar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'red',
        borderWidth: 2
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'grey'
    },
})