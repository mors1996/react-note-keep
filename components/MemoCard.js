import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, IconButton, Surface } from "@react-native-material/core";
import { IconComponentProvider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default class MemoCard extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { clicked: false };
    }
    render = () => {
        return (<Surface elevation={1}
            category="medium"
            style={styles.item}><Text>{this.props.title}</Text><IconButton icon={(<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="pen" size={24}></Icon></IconComponentProvider>)} color="white" title={"See note"}></IconButton>
        </Surface>);
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: 'yellow',
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
});


