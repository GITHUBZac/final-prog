import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

 class Home extends Component {
     constructor(props) {
         super(props)
     }

     ejecutarConAccionCorta() {
         console.log('El Cliente nos pidio algo');
     }

     ejecutarConAccionLarga() {
         console.log('El cliente nos pidio algo Largo');
     }

     
    render() {
        return (
            <View>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Register')}>
                    I do not have an account: Register
                </TouchableOpacity>

                <TouchableOpacity 
                style = {styles.button}
                onPress = {()=>this.ejecutarConAccionCorta()}
                onLongPress = {() => this.ejecutarConAccionLarga()}
                >
                    <Text style = {styles.textoBtn}>
                        Algun dia sere Boton
                    </Text>
                </TouchableOpacity>

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
