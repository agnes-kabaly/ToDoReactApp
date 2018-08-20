import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions,
    AsyncStorage,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {LinearGradient} from 'expo';
import Note from '../note/Note';

var screen = Dimensions.get('window');

export default class AdToDo extends React.Component {

    state = {
        noteArray: [],
        noteText: '',
    };

    render() {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)}></Note>
        });

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
                <LinearGradient style={styles.container} colors={['#40FF00', '#FFFF00']}>
                    <View style={styles.cardView}>
                        <ScrollView style={styles.scrollContainer}>
                            {notes}
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                        <TextInput style={styles.textInput}
                                   onChangeText={(noteText) => this.setState({noteText})} value={this.noteText}
                                   placeholder='> Add an item!'
                                   placeholderTextColor="#0B610B"
                                   underlineColorAndroid="transparent">
                        </TextInput>
                    </View>

                </LinearGradient>
            </KeyboardAvoidingView>
        )
    };

    addNote() {
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() +
                "/" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                'note': this.state.noteText});
            this.setState({noteArray: this.state.noteArray});
            //AsyncStorage.setItem('noteArray', this.state.noteArray);
            this.setState({noteText: ''});
        }
    }

    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }
}

const styles = StyleSheet.create ({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    cardView: {
        flex: 1,
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: { height: 0, width: 0 },
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: screen.width -25,
    },
    footer: {
        elevation: 6,
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        right: 0,
        left: 0,
    },
    addButton: {
        backgroundColor: '#40FF00',
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: '#0B3B0B',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -45,
        zIndex: 10,
        elevation: 8,

    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 24,
    },
    textInput: {
        alignSelf: 'stretch',
        //color: '#40FF00',
        color: '#0B610B',
        padding: 20,
        paddingTop: 46,
        backgroundColor: '#C8FE2E',
        borderTopWidth: 2,
        borderTopColor: 'green',
        paddingBottom: 50,
    },
});