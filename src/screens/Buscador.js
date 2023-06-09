import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db, auth } from "../firebase/config"
import { FontAwesome } from '@expo/vector-icons'
class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            infoUser: [],
            allUsers: [],
            busqueda: ''
        };
    }
    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let users = []
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                infoUser: [],
                allUsers: users
            },
                () => console.log(this.state.infoUser)
            )
        })
    }

    buscador(usuarioBuscado) {
        let resultadoBusqueda = []
        usuarioBuscado == '' ?
            this.setState({ infoUser: resultadoBusqueda, busqueda: usuarioBuscado }) :
            resultadoBusqueda = this.state.allUsers.filter((item) => {
                return (item.data.owner.includes(usuarioBuscado) ? item.data.owner.includes(usuarioBuscado) : item.data.usuario.includes(usuarioBuscado))
            })
        this.setState({ infoUser: resultadoBusqueda, busqueda: usuarioBuscado })
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Buscar'
                    onChangeText={(text) => this.buscador(text)}
                    value={this.state.busqueda}
                />
                <Text style={styles.text}>Quizas conozcas...</Text>
                {(this.state.infoUser.length == 0 && this.state.busqueda != '') ?
                    <Text style={styles.text}>El email o el nombre de usuario no existe</Text>
                    :
                    <FlatList
                        data={this.state.infoUser}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <TouchableOpacity onPress={() => auth.currentUser.email === item.data.owner ? this.props.navigation.navigate('Profile', { email: item.data.owner }) : this.props.navigation.navigate('ProfileAmigo', { email: item.data.owner })}>
                            <Text style={styles.text}> {item.data.owner} ({item.data.usuario})</Text>
                        </TouchableOpacity>} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
                    />
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#151515',
    },

    input: {
        fontSize: 20,
        borderWidth: 2,
        height: 50,
        width: '90%',
        borderRadius: 40,
        borderColor: 'red',
        padding: 15,
        margin: 15,
        backgroundColor: '#3F3F40',
        color: 'white'
    },
    to: {
        width: 200,
        height: 50,
        margin: 5,
        backgroundColor: 'deepskyblue',
        textAlign: 'center',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    text:{
        color:'white'
    }
})

export default Buscador