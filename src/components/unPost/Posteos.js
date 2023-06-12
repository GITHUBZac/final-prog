import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import UnPost from './UnPost'

function Posteos(props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UnPost navigation={props.navigation} postData={item} />}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default Posteos