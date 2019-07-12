import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class Tab extends Component{
    state = {
        lat: "",
        long: ""
    }

    render(){
        return(
            <View>
                <Text>Lat:{this.state.lat} e Long:{this.state.long}</Text>
                <Button title="Get Pos" onPress={this.requestLocalizationPermission}/>
            </View>
        );
    }

    requestLocalizationPermission = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== "granted"){
            this.setState({long: "Denied"});
        }else{
            this.setState({long: "Granted"});
        }

        await Location.getProviderStatusAsync().then(console.warn);
        await Location.enableNetworkProviderAsync().then(console.warn).catch(console.warn);
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        this.setState({lat: JSON.stringify(location)});
    }

    getCurrentPosition = async () => {
        let location = await Location.getCurrentPositionAsync({});
        this.setState({lat: location});
    }
}