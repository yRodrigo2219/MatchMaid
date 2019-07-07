import React, { Component } from 'react';
import { View, 
    TextInput, 
    Button } from 'react-native';

export default class MaidSignUp extends Component{
    render(){
        return(
            <View>
                <TextInput
                    placeholder="Maid Sign Up"
                />

                <Button
                    title="Sign Up"
                />

            </View>
        );
    }
}