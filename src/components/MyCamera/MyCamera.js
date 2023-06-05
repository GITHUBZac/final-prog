import React, { Component } from 'react'
import { Camera } from "expo-camera"
import { Text, View , StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import { auth } from '../../firebase/config'
import { storage } from '../../firebase/config'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


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
            <View style = {styles.container}>
                {
                this.state.permisos ?
                this.state.mostrarCamara ?
                    <View style = {styles.container}>
                        <TouchableOpacity onPress={()=> this.sacarFoto()}>
                            <Text>Sacar la foto  <Entypo name="camera" size={24} color="black" /></Text>

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
                        <Text>Guardar Foto   <AntDesign name="upload" size={24} color="black" /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.rechazar()}>
                        <Text>Rechazar Foto</Text>
                    </TouchableOpacity>
                </View>
                :

                 <ActivityIndicator size='large' color= 'blue'/>
                
                }
            </View>
        )
    }
}




const styles = StyleSheet.create(
{
    camera: {
        height: 500,
        width: 500    
    },

    imagen: {
        height: "70vh",
        width: "70vh"    
    },
    container: {
        height: 500,            
    },

}
)
export default MyCamera;
