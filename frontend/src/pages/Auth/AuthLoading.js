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

        if(userToken === "true"){
            this.props.navigation.navigate('App');
        }else{
            this.props.navigation.navigate('Auth');
        }
    }

    render(){
        return(
            <View>
                <Text>Auth Loading</Text>
            </View>
        );
    }
}