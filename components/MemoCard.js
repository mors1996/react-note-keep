import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, IconButton, Surface } from "@react-native-material/core";
import { IconComponentProvider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Animated, PanResponder, TouchableOpacity } from 'react-native';



export default class MemoCard extends React.Component {
    pan = new Animated.ValueXY();

    panResponder =
        PanResponder.create({

            onMoveShouldSetPanResponder: (e, gestureState) => {

                if (gestureState.vx == 0) return false; else { return true; }
            },
            onPanResponderMove: Animated.event([null, { dx: this.pan.x, dy: this.pan.y }]),
            onPanResponderEnd: () => {
                console.log("released panner")
                if (this.props.updateItemPosition != undefined)
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

                    style={{
                        transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }],
                    }}
                    {...this.panResponder.panHandlers}
                >
                    <Surface elevation={1}
                        category="medium"
                        style={styles.item}>
                        {this.props.new !== 'true' &&
                            <TouchableOpacity activeOpacity={1} >
                                <IconButton onPress={this.props.onPressDelete} style={styles.closeButton} icon={(<IconComponentProvider IconComponent={MaterialCommunityIcons}><Icon name="close" size={32}></Icon></IconComponentProvider>)} /></TouchableOpacity>}
                        <Text>{this.props.title}</Text><TouchableOpacity activeOpacity={1} ><IconButton onPress={this.props.onPress} style={styles.middleBtn} icon={(<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                            <Icon name={this.props.new !== 'true' ? 'pen' : 'plus'} size={32}></Icon></IconComponentProvider>)} color="white" title={"See note"}></IconButton></TouchableOpacity>
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
        maxWidth: 150
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


