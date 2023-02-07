import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, IconButton, Surface } from "@react-native-material/core";
import { IconComponentProvider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Animated, PanResponder } from 'react-native';



export default class MemoCard extends React.Component {
    pan = new Animated.ValueXY();

    panResponder =
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: this.pan.x, dy: this.pan.y }]),
            onPanResponderRelease: () => {
                console.log("released panner")
                this.props.updateItemPosition(this.pan)

                this.pan.extractOffset();

            },
        });

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { clicked: false };

    }

    componentDidUpdate = () => {

    }
    
    componentDidMount = () => {
        if (this.props.coord != null) {
            console.log("Card mounted")
            let coord = this.props.coord;
            console.log(coord)
            console.log(this.pan)
            // this.pan = new Animated.ValueXY({ x: 100, y:100 });
            this.pan.setValue({ x: coord.x, y: coord.y });

        }
    }
    componentDidCatch = () => {
        console.error("Error")
    }


    render = () => {
        return (
            <View style={styles.container}>
                <Animated.View
                 >
                    <Surface elevation={1}
                        category="medium"
                        style={styles.item}>
                        {this.props.new !== 'true' &&
                            <IconButton style={styles.closeButton} onPress={this.props.onPressDelete} icon={(<IconComponentProvider IconComponent={MaterialCommunityIcons}><Icon name="close" size={24}></Icon></IconComponentProvider>)} />}
                        <Text>{this.props.title}</Text><IconButton style={styles.middleBtn} onPress={this.props.onPress} icon={(<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                            <Icon name={this.props.new !== 'true' ? 'pen' : 'plus'} size={24}></Icon></IconComponentProvider>)} color="white" title={"See note"}></IconButton>
                    </Surface>
                </Animated.View>
            </View>);
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
    middleBtn: {
        alignContent: "center",
        alignSelf: "center"
    },
    closeButton: {
        alignSelf: 'flex-end',
        alignContent: 'flex-end',


    }
});


