import React, { Component } from 'react'
import { Text, View , TouchableOpacity, Image, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {storage } from '../../firebase/config'

export default class MyImagePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagenCargada: ''
        }
    }
    activarPicker() {
        ImagePicker.launchImageLibraryAsync()
        .then((imageData) => this.setState({imagenCargada: imageData.assets[0].uri}))
        .catch()
    }

    aceptarImagen(){
        fetch(this.state.imagenCargada)
        .then(resp => resp.blob())
        .then(imagen => {
            let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`)
            ref.put(imagen)
            .then(()=>{
                ref.getDownloadURL()
                .then(url => this.props.actualizarFotoPerfil(url))
            })
        })
        .catch(err => console.log(err))
    }

    rechazarImagen(){
        this.setState({imagenCargada: ''})
    }


    render() {
        return (
            <View>

                {
                    this.state.imagenCargada !== '' ?
                    <>
                        <Image 
                        source={{uri: this.state.imagenCargada}} 
                        style={styles.img}
                        />
                        <TouchableOpacity
                        onPress={()=>this.aceptarImagen()}
                        >
                            <Text>Aceptar Imagen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=> this.rechazarImagen()}>
                            <Text>Rechazar Imagen</Text>
                        </TouchableOpacity>

                    </>
                    :

                    <>
                    <Text>Cargue una foto para tu perfil</Text>
                    <TouchableOpacity
                    onPress = {() => this.activarPicker()}
                    >
                   <Text>Cargar imagen de mi libreria</Text>

                    </TouchableOpacity>

                    </>

                }
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        height: 400
    }
})
