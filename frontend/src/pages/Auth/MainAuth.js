import React, { Component } from 'react';
import { View, 
    TextInput,  
    AsyncStorage,
    TouchableOpacity,
    Text    } from 'react-native';

import GStyles from '../GlobalStyle';
import AuthStyles from '../Auth/Styles/MainAuthStyles';

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
            <View style = { GStyles.alinhamento}>
                <TextInput
                    style = {[GStyles.textInputGlobal,GStyles.fonte]}
                    value={this.state.login}
                    onChangeText={this.handleLoginChange}
                    placeholder="Email"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                />

                <TextInput
                    style = {[GStyles.textInputGlobal,GStyles.fonte]}
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    placeholder="Senha"
                    secureTextEntry={true}
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                />
                
                    <TouchableOpacity
                        style = { [GStyles.buttonGlobal,AuthStyles] }
                        onPress={this.handleSignInAction}>
                             <Text>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = { [GStyles.buttonGlobal,AuthStyles] }                       
                        onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                            <Text>Cadastrar</Text>
                    </TouchableOpacity>

            </View>
        );
    }
}