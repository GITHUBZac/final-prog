import React, { Component } from 'react'
import { Camera } from "expo-camera"
import { Text, View , StyleSheet, TouchableOpacity, Image} from 'react-native'
import { auth } from '../../firebase/config'
import { storage } from '../../firebase/config'


class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos: false, 
            mostrarCamara: true,
            urlDos: ""
        }
        this.metodosCamara = ""
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{this.setState({permisos:true})})
        .catch(error=>console.log(error))
    }

    sacarFoto(){
        this.metodosCamara.takePictureAsync()
        .then(foto=>{
            this.setState({
                urlDos: foto.uri,
                mostrarCamara: false,
            })
        })
        .catch(error=>console.log(error))
    }

    guardar(){
        fetch(this.state.urlDos)
        .then(res => res.blob())
            .then( img => { 
           
                const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
                refStorage.put(img)
                    .then(()=>{
                        refStorage.getDownloadURL() 
                        .then( url => this.props.onImageUpload(url))
                    })
            })
        .catch(e => console.log(e))
    }

    rechazar(){
        this.setState({
            mostrarCamara: true,
            urlDos: ""
        })
    }

    render() {
        return (
            <View>
                {
                this.state.permisos ?
                this.state.mostrarCamara ?
                    <View>
                        <TouchableOpacity onPress={()=> this.sacarFoto}>
                            <Text>Sacar la foto</Text>
                        </TouchableOpacity>

                    <Camera 
                        style = {styles.camera}
                        type = {Camera.Constants.Type.front}
                        ref={metodosCamara => this.metodosCamara = metodosCamara}
                    />
                    </View>
                :
                <View>
                    <Image
                        style = {styles.imagen}
                        source = {{uri: this.state.urlDos}}
                        resizeMode = 'cover'
                    />
                    <TouchableOpacity onPress={()=> this.guardar()}>
                        <Text>Guardar Foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.rechazar()}>
                        <Text>Rechazar Foto</Text>
                    </TouchableOpacity>
                </View>
                :

                 <Text>No le diste permiso a la camara</Text>
                
                }
            </View>
        )
    }
}




const styles = StyleSheet.create(
{
    camera: {
        height: "500",
        width: "500"    
    },

    imagen: {
        height: "70vh",
        width: "70vh"    
    }

}
)
export default MyCamera;
