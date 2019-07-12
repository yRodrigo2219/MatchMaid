import React, { Component } from 'react';
import { View,
    Text, 
    Button,
    AsyncStorage } from 'react-native';

export default class MainApp extends Component{
    state = {
        drawer: false
    }

    handleSignOut = async ()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render(){
        return(
            <View>
                <Text>Main Page</Text>

                <Button
                    title="Sign Out"
                    onPress={this.handleSignOut}
                />

                <Button
                    title='Filter'
                    onPress={() => this.props.navigation.toggleDrawer()}
                />

            </View>
        );
    }
}