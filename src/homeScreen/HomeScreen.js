import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
    render() {

        const text = 'Welcome';

        return (
            <View>
                <Text>{text}</Text>
            </View>
        );
    }
}