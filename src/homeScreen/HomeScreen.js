import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {

        const text = 'TODO';

        return (
            <View style={styles.container}>
                <View style={styles.textView}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={styles.imageView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddToDo")}>
                        <Image style={styles.image} source={require('../assets/plus4.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 160,
    },
    text: {
        textAlign: 'center',
        fontSize: 60,
        color: '#40FF00',
        fontFamily: 'serif',
        fontWeight: 'bold',
    },
    imageView: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 420,
    },
    image: {
        width: 45,
        height: 45,
    },
});