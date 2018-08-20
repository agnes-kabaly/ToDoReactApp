import React, {Component} from "react";
import HomeScreen from "./HomeScreen";
import { StackNavigator } from "react-navigation";
import AddToDo from "../todo/AddToDo";

const HomeScreenStackNavigator = StackNavigator ({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    AddToDo: {
        screen: AddToDo,
        navigationOptions: {
            title: "TODO",
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#40FF00',
                elevation: 0,
            },
            headerTitleStyle: {
                color: '#ffffff',
                fontWeight: 'bold',
                textAlign: 'center',
                marginLeft: 56,
                fontSize: 40,
            },
        },
    },
});

export default HomeScreenStackNavigator;