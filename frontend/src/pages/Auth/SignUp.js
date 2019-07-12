import React, { Component } from 'react';

import { View,
     Text,
     Button } from 'react-native';

export default class SignUp extends Component{
    render(){
            return(
                <View>
                    <Text>Cadastro</Text>
                    <Button
                        title="Usuário"
                        onPress={()=>{this.props.navigation.navigate("UserSignUpScreen")}}
                    />
                    <Button
                        title="Empregada"
                        onPress={()=>{this.props.navigation.navigate("MaidSignUpScreen")}}
                    />
                </View>
        );
    }
}