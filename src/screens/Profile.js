import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ProfileData from '../components/Profile/ProfileData'

 class Profile extends Component {
    render() {
        return (
            <View>
                <Text> Perfil </Text>
                <ProfileData navigation = {this.props.navigation}/>

            </View>
        )
    }
}

export default Profile