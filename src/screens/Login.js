import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, TouchableHighlightBase } from 'react-native'
import { auth, db } from '../firebase/config';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputMail: "",
            inputPassword: "",
            error: ""
        }
    }

    iniciarUsuarioLogin(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
            .then(res => {
                this.setState({
                    error: "",
                })
                this.props.navigation.navigate("HomeNav")
            })
            .catch(error => this.setState({
                error: `El error es: ${error.message}`
            }))
    }


    render() {
        return (
            <View>
                <View style={styles.contenedorLogin}>
                    <Text style={styles.login} onPress={() => this.props.navigation.navigate('Register')}>Volver al Register</Text>
                </View>
                <Text>
                    {this.state.error}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digita tu E-Mail'
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({ inputMail: text })}
                    value={this.state.inputMail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Digita tu Password'
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                    value={this.state.inputPassword}
                    secureTextEntry={true}
                />
                {
                    this.state.inputMail == "" || this.state.inputPassword == "" ?
                        <TouchableOpacity style={styles.btnerror}>
                            <Text style={styles.buttonText}> Loguearme</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.btn} onPress={() => this.iniciarUsuarioLogin(this.state.inputMail, this.state.inputPassword)}>
                            <Text style={styles.btnText}> Loguearme</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#3d3d3d',
        marginTop: 24,
        height: 24,
        padding: 5
    },
    btn: {
        backgroundColor: '#54d0e0',
        padding: 10,
        borderRadius: 20,
        marginTop: 32
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'green'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'grey'
    },
    login: {
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contenedorLogin: {
        backgroundColor: 'black',
        width: 180,
        borderRadius: 10,
        height: 18
    }
})

export default Login