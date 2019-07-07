import React, { Component } from 'react';
import { View, 
    TextInput, 
    Button } from 'react-native';

export default class UserSignUp extends Component{
    render(){
        return(
            <View>
                <TextInput
                    placeholder="User Sign Up"
                />

                <Button
                    title="Sign Up"
                />

            </View>
        );
    }
}