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


    render = () => {
        return (
            <View >
                <Animated.View
                    style={{
                        transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }],
                    }}
                    {...this.panResponder.panHandlers}>
                    <Surface elevation={1}
                        category="medium"
                        style={styles.item}>
                        <IconButton style={styles.closeButton} onPress={this.props.onPressDelete} icon={(<IconComponentProvider IconComponent={MaterialCommunityIcons}><Icon name="close" size={24}></Icon></IconComponentProvider>)} />
                        <Text>{this.props.title}</Text><IconButton onPress={this.props.onPress} icon={(<IconComponentProvider IconComponent={MaterialCommunityIcons}>
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
        maxWidth: '200px'
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
    closeButton: {
        alignSelf: 'flex-end',
        alignContent: 'flex-end',


    }
});


