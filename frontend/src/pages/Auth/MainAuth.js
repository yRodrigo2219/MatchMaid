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

    colorValidation = {
        email: false,
        password: false
    }

    handleLoginChange = (login) => {
        const filterEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(login.length <= 40){
            this.setState({login: login},()=>{
                (filterEmail.test(login) && login !== "") ? this.colorValidation.email = true : this.colorValidation.email = false;
            });
        }
    }

    handlePasswordChange = (password) => {
        if(password.length <= 20){
            this.setState({password: password}, ()=>{
                (this.state.password.length >=8) ? this.colorValidation.senha = true : this.colorValidation.senha = false;
            });
        }
    }

    handleSignInAction = async () => {
        await AsyncStorage.setItem('userToken', "true");
        await AsyncStorage.setItem('userType', "User");
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
                    secureTextEntry={true}
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