import React from "react";
import { StyleSheet, Text, View, SafeAreaView, VirtualizedList } from 'react-native';
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
        this.state = { notes: [{ "id": 1, "title": "Nota 1", "text": "aaaaaaaaaaaaaaaaaasaasda" }, { "id": 2, "title": "Nota 2", "text": "aaaaaaaaaaaaaaaaaasaasda" }, { "id": 3, "title": "Nota 3" }], clicked: false, selectedNote: {}, newNote: false };
    }

    getItem = (_data, index) => (this.state.notes[index]
    );

    getItemCount = (_data) => this.state.notes.length;

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.boldSubTitle}>Your Notes</Text>
                <MemoCard onPress={() => this.setVisible(true, {}, true)} new="true" title="Add new note" />
                <SafeAreaView style={styles.safeArea}>
                    <VirtualizedList
                        initialNumToRender={this.state.notes.length}
                        renderItem={({ item }) => <MemoCard onPress={() => this.setVisible(true, item)} onPressDelete={() => this.removeItem(item)} new="false" title={item.title} />}
                        keyExtractor={item => item.id}
                        getItemCount={this.getItemCount}
                        getItem={this.getItem}
                        style={({ width: '100%' })}
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
            </View>
        );
    }
    setVisible(x, selectedNote = this.state.selectedNote, newNote = false) { this.setState({ clicked: x, selectedNote: selectedNote, newNote: newNote }) }
    setNewItem(
        item
    ) {
        var index = this.state.notes.findIndex(x => x.id == item.id)
        this.state.notes[index] = item;
    }
    addItem(item) {
        var index = Math.max(...this.state.notes.map(i => i.id))
        item.id = index + 1;
        var list = this.state.notes;
        list.push(item)
        this.setState({ notes: list })
    }

    removeItem(
        item
    ) {
        var index = this.state.notes.findIndex(x => x.id == item.id)
        console.log(index)
        var list = this.state.notes;
        list.splice(index, 1); // 2nd parameter means remove one item only
        this.setState({ notes: list })

    }


}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },

    safeArea:
    {
        width: '100%'
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


