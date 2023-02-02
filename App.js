import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NoteView from './components/NoteView';


// Main app here! Import each component from /components folder
export default class App extends React.Component {
  render = () =>{
  return (
    <View style={styles.container}>
      <Text style={styles.wordBold} >Hello</Text>
      <StatusBar style="auto" />

      <NoteView/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:10, 

    alignItems: 'center',
  },
  wordBold: {
    fontWeight: "bold", 
    fontSize: 30
  }

});
