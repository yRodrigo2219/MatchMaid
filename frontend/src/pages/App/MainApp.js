import React, { Component } from 'react';
import { View, 
    Text, 
    Button, 
    AsyncStorage } from 'react-native';
import {
    SearchBar
    } from 'react-native-elements';

export default class MainApp extends Component{
    state={ 
        search:''
    }

    updateSearch = search=> {
        this.setState({search})
    }

    handleSignOut = async ()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }



    render(){

        const search = this.state.search;

        return(
            <View>
                
                <Text>Main App Page</Text>

                <SearchBar
                    placeholder="Pesquisa"
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme={true}
                />
                
                <Button
                    title="Sair"
                    onPress={this.handleSignOut}
                />
            </View>
        );
    }
}
