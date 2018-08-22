import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class Note extends Component {
    render() {
        return (
            <View key={this.props.keyval} style={styles.container}>
                <View>
                    <TouchableOpacity onPress={this.props.doneItem}>
                        <Image style={styles.image}
                               source={
                                   this.props.val.isCompleted ? require('../assets/checked-gray.png')
                                   : require('../assets/Button-Ok.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[styles.noteDate, this.props.val.isCompleted ? styles.completedTodo : styles.noteDate]}>{this.props.val.date}</Text>
                    <Text style={[styles.noteText, this.props.val.isCompleted ? styles.completedTodo : styles.noteText]}>{this.props.val.note}</Text>
                </View>
                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>D</Text>
                </TouchableOpacity>
            </View>
        )
    };

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        flexDirection: 'row',
        borderBottomColor: '#D8D8D8',
    },
    noteDate: {
        fontSize: 13,
        paddingLeft: 20,
        /*borderLeftWidth: 10,
        borderLeftColor: 'yellow',*/
    },
    noteText: {
        fontSize: 16,
        paddingLeft: 20,
        /*borderLeftWidth: 10,
        borderLeftColor: 'yellow',*/
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    noteDeleteText: {
        color: 'white',
    },
    image: {
        width: 40,
        height: 40,
    },
    completedTodo: {
        color: '#848484',
        textDecorationLine: 'line-through',
    },
});