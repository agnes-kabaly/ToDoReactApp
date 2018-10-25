import React, { Component } from 'react';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

import {
    Text,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';

export default class EditModal extends Component {
    constructor() {
        super();
        this.state = {
            key: '',
            noteText: '',
        };
    }

    showEditModal = (editingTodo, noteKey) => {
        this.setState({
            key: noteKey,
            noteText: editingTodo.note,
        });
        this.refs.myModal.open();
    };

    onSavePressed() {
        this.props.callback(this.state.noteText, this.state.key);
        this.refs.myModal.close();
    }


    render() {
        return (
            <Modal
                style={[styles.modal]}
                ref={"myModal"}
                position='top'
                backdrop={true}
                onClosed={() => {
                    console.log("Exit with note: " + this.state.noteText + " and key: " + this.state.key);
                }}
            >
                <View style={styles.rowView}>
                    <Text style={styles.text}>Edit Note:</Text>
                    <Button style={styles.button}
                            containerStyle={{
                                padding: 8,
                                marginLeft: 144,
                                marginTop: 3,
                                height: 40,
                                borderRadius: 6,
                                backgroundColor: 'mediumseagreen',
                            }}
                            onPress={() => this.onSavePressed()}
                    >
                        Save
                    </Button>
                </View>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={ (text) => this.setState({noteText: text})}
                    placeholder="NewTodo"
                    value={this.state.noteText}
                />
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    rowView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        shadowRadius: 10,
        width: 280,
        height: 120,
        marginTop: 30,
        marginBottom: 60,
    },
    inputStyle: {
        fontSize: 16,
        height: 40,
        borderBottomColor: 'grey',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 16,
    },
    text: {
        color: "black",
        fontSize: 18,
    },
    button: {
        fontSize: 18,
        color: 'white',
    },

});