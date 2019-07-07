import React, { Component } from 'react';
import { View, 
    TextInput, 
    TextInputProps, 
    Button } from 'react-native';

export default class LoginScreen extends Component{
    state = {
        login: "",
        password: ""
    }

    handleLoginChange = (login) => {
        this.setState({login: login});
    }

    handlePasswordChange = (password) => {
        this.setState({password: password})
    }

    render(){
        return(
            <View>
                <TextInput
                    value={this.state.login}
                    onChangeText={this.handleLoginChange}
                    placeholder="Password"
                />
                
            </View>
        );
    }
}