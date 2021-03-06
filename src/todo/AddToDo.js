import React from 'react';
import {
    View,
    Text,
    Button,
    Keyboard,
    Platform,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {LinearGradient} from 'expo';
import Note from '../note/Note';
import EditModal from '../note/EditModal';

var screen = Dimensions.get('window');

export default class AdToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            noteArray: [],
            noteText: '',
            isCompleted: false,
        };
    }

    componentDidMount = async() => {
        let noteArray = await AsyncStorage.getItem('noteArray');
        let myTodoList = JSON.parse(noteArray);
        if (myTodoList != []){
            this.setState({
                noteArray: myTodoList
            });
        };
    };

    render() {
        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val}
                         deleteMethod={() => this.deleteNote(key)}
                         doneItem={() => this.doneItem(key)}
                         editing={() => this.refs.editModal.showEditModal(this.state.noteArray[key], key)}></Note>
        });

        const keyboardVerticalOffset = Platform.OS === 'android' ? 40 : 0;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper} keyboardVerticalOffset={keyboardVerticalOffset}>
                <LinearGradient style={styles.container} colors={['#40FF00', '#FFFF00']}>
                    <Button title="sh" onPress={() => this.showData()}></Button>
                    <View style={styles.cardView}>
                        <ScrollView style={styles.scrollContainer}>
                            {notes}
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={this.addNote.bind(this)}
                            style={styles.addButton}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                        <TextInput style={styles.textInput}
                                   ref={input => this.myInput = input}
                                   onChangeText={(noteText) => this.setState({noteText})} value={this.noteText}
                                   placeholder='> Add an item!'
                                   placeholderTextColor="#0B610B"
                                   underlineColorAndroid="transparent">
                        </TextInput>

                        <EditModal ref={'editModal'} callback={this.editHandler}>


                        </EditModal>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        )
    };

    addNote() {
        var d = new Date();
        let date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() +
            "/" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        if (this.state.noteText) {
            this.state.noteArray.push({
                date: date,
                note: this.state.noteText,
                isCompleted: this.state.isCompleted});
        }
        Keyboard.dismiss();
        //console.log(this.state.noteArray);
        //this.setState({noteArray: this.state.noteArray});
        this.setState({noteText: ''});
        this.myInput.clear();
        AsyncStorage.setItem('noteArray', JSON.stringify(this.state.noteArray));
    }

    async refreshAsync() {
        AsyncStorage.setItem('noteArray', JSON.stringify(this.state.noteArray));
    };

    showData = async() => {
        let noteArray = await AsyncStorage.getItem('noteArray');
        let myTodoList = JSON.parse(noteArray);
        this.setState({
            noteArray: myTodoList
        });
        for (var eachTodoIndex in this.state.noteArray) {
            console.log("oneTodo: " + this.state.noteArray[eachTodoIndex].note
                + " date: " + this.state.noteArray[eachTodoIndex].date
                + this.state.noteArray[eachTodoIndex].isCompleted);
        };
    };

    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
        (async () => {
            await this.refreshAsync();
        })();
    }

    doneItem(key) {
        this.state.noteArray[key].isCompleted = !this.state.noteArray[key].isCompleted;
        this.setState({noteArray: this.state.noteArray});
        (async () => {
            await this.refreshAsync();
        })();
    };

    editTodo(key, newText) {
        this.state.noteArray[key].note = newText;
        this.setState({noteArray: this.state.noteArray});
        (async () => {
            await this.refreshAsync();
        })();
    }

    editHandler = (noteFromEdit, editKey) => {
        this.setState({
            noteText: noteFromEdit,
        });
        this.editTodo(editKey, noteFromEdit);
    };

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
        marginBottom: 128,
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