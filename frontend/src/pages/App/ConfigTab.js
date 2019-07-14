import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage, Image } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class ConfigTab extends Component{
    state = {
        imagem: null,
        lat: 0,
        long: 0
    }

    handleSignOut = async ()=>{
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('AuthLoading');
    }

    requestLocalizationPermission = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== "granted"){
            console.warn('Denied!');
        }else{
            console.warn('Granted!');
        }

        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        this.setState({
            lat: location.coords.latitude,
            long: location.coords.longitude
        });
    }

    requestImagePicker = async () =>{
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: false
        });

        let imgBase64 = `data:image/jpg;base64,${pickerResult.base64}`;
        console.warn(imgBase64);

        this.setState({
            imagem: imgBase64
        });
    }

    render(){
        return(
            <View>
                <Button
                    title="Sign Out"
                    onPress={this.handleSignOut}/>

                <Button 
                    title="Get Pos" 
                    onPress={this.requestLocalizationPermission}/>
                
                <Button 
                    title="Get Img" 
                    onPress={this.requestImagePicker}/>

                {
                    this.state.imagem 
                    ? <Image
                        style={{width: 240, height: 240}}
                        source={{uri: this.state.imagem}}/> : null
                }

            </View>
        );
    }
}