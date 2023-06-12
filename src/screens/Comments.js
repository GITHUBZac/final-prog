import { Text, View, FlatList} from 'react-native'
import React, { Component } from 'react'
import FormComment from '../components/FormComment';
import { db, auth } from '../firebase/config';

export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {}
        }
    }

    componentDidMount(){
        db.collection('posts').doc(this.props.route.params.id).onSnapshot( doc => {
            this.setState({
                data: doc.data()
            }),()=> console.log(this.state.data.comentarios)
        })
    }
  
    render() {
    console.log(this.props);
    return (
      <View>
        <Text>Aca podras ver todos los comentarios del posteo</Text>
        <FlatList
            data={this.state.data.comentarios}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({item}) => <Text>{item.comentario}</Text>}
        />
        <FormComment idPost={this.props.route.params.id}/>
      </View>
    )
  }
}