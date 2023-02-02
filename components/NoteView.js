import React from "react";
import { StyleSheet, Text, View, SafeAreaView, VirtualizedList } from 'react-native';
import MemoCard from "./MemoCard";

const Item = ({title}) => (
    <MemoCard title={title}>
    </MemoCard>
);

const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
});

const getItemCount = (_data) => 50;

export default class NoteView extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { notes: [] };
    }
    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.boldSubTitle}>Your Notes</Text>
                <MemoCard title="Add new note" />
                <SafeAreaView style={styles.container}>
                    <VirtualizedList
                        initialNumToRender={3}
                        renderItem={({ item }) => <MemoCard title={item.title} />}
                        keyExtractor={item => item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                    />
                </SafeAreaView>
            </View>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
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
        padding:20,
        fontSize:18, 
        fontWeight: 'bold'
    }
});


