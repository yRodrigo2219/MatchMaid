import React, { Component } from 'react';

import { View,
     Text,
     Button } from 'react-native';

export default class SignUp extends Component{
    render(){
        return(
            <View>
                <Text>Sign up</Text>
                <Button
                    title="User"
                    onPress={()=>{this.props.navigation.navigate("UserSignUpScreen")}}
                />
                <Button
                    title="Maid"
                    onPress={()=>{this.props.navigation.navigate("MaidSignUpScreen")}}
                />
            </View>
        );
    }
}