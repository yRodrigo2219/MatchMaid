import React, { Component } from 'react';
import { View, 
    TextInput,  
    Button, 
    AsyncStorage } from 'react-native';

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

    handleSignInAction = async () => {
        await AsyncStorage.setItem('userToken', "true");
        this.props.navigation.navigate('AuthLoading');
    }

    render(){
        return(
            <View>
                <TextInput
                    value={this.state.login}
                    onChangeText={this.handleLoginChange}
                    placeholder="Email"
                />

                <TextInput
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    placeholder="Senha"
                />
                
                <Button
                    title="Entrar"
                    onPress={this.handleSignInAction}
                />

                <Button
                    title="Cadastrar"
                    onPress={()=>{this.props.navigation.navigate('SignUpScreen')}}
                />

            </View>
        );
    }
}