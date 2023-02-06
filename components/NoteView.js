import React from "react";
import { StyleSheet, Text, View, SafeAreaView, VirtualizedList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import MemoCard from "./MemoCard";
import {
    Provider,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Button,
    TextInput,
    IconButton,
    Icon,
    PortalProvider,
    useWindowSize
} from "@react-native-material/core";


const Item = ({ title }) => (
    <MemoCard title={title}>
    </MemoCard>
);




export default class NoteView extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { notes: [], clicked: false, selectedNote: {}, newNote: false };
    }

    getItem = (_data, index) => (this.state.notes[index]
    );

    getItemCount = (_data) => this.state.notes.length;
    componentDidMount = async () => { var list =  await AsyncStorage.getItem("list"); this.setState({notes: JSON.parse(list)}); }
    render = () => {
        return (

            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.boldSubTitle}>Your Notes</Text>
                <MemoCard onPress={() => this.setVisible(true, {}, true)} new="true" title="Add new note" />
                <VirtualizedList
                    contentInsetAdjustmentBehavior="always"
                    style={styles.list}
                    horizontal="true"
                    initialNumToRender={this.state.notes.length}
                    renderItem={({ item }) => <MemoCard onPress={() => this.setVisible(true, item)} onPressDelete={() => this.removeItem(item)} new="false" title={item.title} updateItemPosition={coord=>{this.updateItemPosition(coord, item)}} coord = {item.coord} />}
                    keyExtractor={item => item.id}
                    getItemCount={this.getItemCount}
                    getItem={this.getItem}
                />
                <Provider>
                    <Dialog visible={this.state.clicked} onDismiss={() => this.setVisible(false)}>
                        <DialogHeader title={(<TextInput
                            style={styles.dialogText}
                            defaultValue={this.state.selectedNote.title}
                            onChangeText={(value) => { this.state.selectedNote.title = value }}

                        />)} />
                        <DialogContent>

                            <TextInput
                                style={styles.dialogText}
                                defaultValue={this.state.selectedNote.text}
                                onChangeText={(value) => { this.state.selectedNote.text = value }}

                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                title="Cancel"
                                compact
                                variant="text"
                                onPress={() => this.setVisible(false)}
                            />
                            <Button
                                title="Confirm"
                                compact
                                variant="text"
                                onPress={() => {
                                    if (!this.state.newNote) this.setNewItem(this.state.selectedNote);
                                    else this.addItem(this.state.selectedNote)
                                    this.setVisible(false)
                                }}
                            />
                        </DialogActions>
                    </Dialog></Provider>
            </SafeAreaView>
        );
    }
    setVisible(x, selectedNote = this.state.selectedNote, newNote = false) { this.setState({ clicked: x, selectedNote: selectedNote, newNote: newNote }) }
    setNewItem(
        item
    ) {
        var index = this.state.notes.findIndex(x => x.id == item.id)
        var list = this.state.notes;
        list[index] = item;
        this.updateList(list)

    }
    async addItem(item) {
        var index = Math.max(...this.state.notes.map(i => i.id))
        item.id = index + 1;
        var list = this.state.notes;
        list.push(item)
        this.setState({ notes: list })
        this.updateList(list)


    }

    updateItemPosition(coord, item)
    {

        var index = this.state.notes.findIndex(x => x.id == item.id)
        var list = this.state.notes;
        item.coord = coord
        
        list[index] = item;
        this.updateList(list)

    }

    async updateList(list) {

        await AsyncStorage.removeItem(
            'list',
        );

        await AsyncStorage.setItem(
            'list',
            JSON.stringify(list)
        );


    }

    async removeItem(
        item
    ) {
        var index = this.state.notes.findIndex(x => x.id == item.id)
        console.log(index)
        var list = this.state.notes;
        list.splice(index, 1); // 2nd parameter means remove one item only
        this.setState({ notes: list })

        this.updateList(list)

    }


}





const styles = StyleSheet.create({
    container: {

    },
    list: {
        width: Dimensions.get('window').width,
    },

    safeArea:
    {
        position: 'relative',
        overflowY: 'visible',
        overflowX: 'visible',
        maxHeight: 'auto',
        height: '400px',
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: "center"

    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
    boldSubTitle: {
        padding: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    dialogText:
    {
        color: 'white',

    }
});


