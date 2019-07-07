import React, { Component } from 'react';
import { View, 
    Text,
    AsyncStorage } from 'react-native';

export default class AuthLoading extends Component{
    constructor(){
        super();
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    render(){
        return(
            <View>
                <Text>Auth Loading</Text>
            </View>
        );
    }
}