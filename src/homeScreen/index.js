import React, {Component} from "react";
import HomeScreen from "./HomeScreen";
import { StackNavigator } from "react-navigation";

const HomeScreenStackNavigator = StackNavigator ({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }
    },
});

export default HomeScreenStackNavigator;