import React, { Component } from 'react';

import { View, 
    Text, 
    Button } from 'react-native';

export default class Main extends Component{
    render(){
        return(
            <View>
                <Text>Main Page</Text>
                <Button
                    title="Sign Up"
                    onPress={()=>{this.props.navigation.navigate("SignUpScreen")}}
                />
                <Button
                    title="Sign In"
                    onPress={()=>{this.props.navigation.navigate("SignInScreen")}}
                />
            </View>
        );
    }
}