import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedbackBase } from 'react-native'
import {auth, db} from '../firebase/config';
import MyCamera from '../components/MyCamera/MyCamera'


 class NewPost extends Component {
     constructor(){
         super()
         this.state = {
             imagen: "",
             descripcion: "",
             likes: [],
             comentarios: [],
             mostrarCamara: true
         }
     }
     
     onImageUpload(url){
         this.setState({
             imagen: url,
             mostrarCamara: false
         })
     }

     crearPost() {
         db.collection('posts')
         .add({
            owner: auth.currentUser.email,
            imagen: this.state.imagen,
            descripcion: this.state.descripcion,
            likes: this.state.likes,
            comentarios: this.state.comentarios,
            createdAt: Date.now()
         })
         .then(() => {
             this.setState({
                imagen: "",
                descripcion: "",
                likes: [],
                comentarios: [],
                mostrarCamara: true
             })
             this.props.navigation.navigate('Home')
         })
         x
         
     }


    render() {
        return (
            <View style = {styles.container}>
              
                   {
                     this.state.mostrarCamara ? 
                      <MyCamera onImageUpload = {url => this.onImageUpload(url)} />  
                     :
                     <View>
                        <TextInput 
                    style={styles}
                    placeholder = 'Escribi aca para agregale una descripcion al posteo!'
                    keyboardType = "default"
                    onChangeText = {(text) => this.setState({descripcion: text})}
                    value = {this.state.descripcion}
                        />
                        <TouchableOpacity style={styles.login} onPress = {() => this.crearPost()} >
                            Postear
                        </TouchableOpacity>
                     </View>  
                     
                   }
               
               
            </View>
        )
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1    
        },
        login: {
            color: 'grey',
            fontWeight: 'bold',
            textAlign: 'center'
        },
    
    }
    )


export default NewPost;
