import React, { Component } from 'react';
import { View, 
    TextInput,  
    Button } from 'react-native';

export default class SignIn extends Component{
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

    handleSignInAction = () => {

    }

    render(){
        return(
            <View>
                <TextInput
                    value={this.state.login}
                    onChangeText={this.handleLoginChange}
                    placeholder="Login"
                />

                <TextInput
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    placeholder="Password"
                />
                
                <Button
                    title="Sign In"
                    onPress={this.handleSignInAction}
                />

            </View>
        );
    }
}