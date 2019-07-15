import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class ConfigTab extends Component{
    state = {
        imagem: null,
        lat: 0,
        long: 0,
        userType: 'User'
    }

    handleSignOut = async ()=>{
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('AuthLoading');
    }

    requestLocalizationPermission = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== "granted"){
            alert("Por favor nos de permissão para acessar sua localização!");
        }else{
            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            this.setState({
                lat: location.coords.latitude,
                long: location.coords.longitude
            });

            await AsyncStorage.setItem("UserLatitude", (location.coords.latitude).toFixed(4).toString());
            await AsyncStorage.setItem("UserLongitude", (location.coords.longitude).toFixed(4).toString());
            Alert.alert("Localização",`Latitude: ${location.coords.latitude} Longitude: ${location.coords.longitude}`);
        }
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

    async componentDidMount(){
        this.setState({
            userType: await AsyncStorage.getItem('userType') || "User"
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
                
                {
                    this.state.userType === "Maid" 
                    ? <Button 
                        title="Get Img" 
                        onPress={this.requestImagePicker}/> : null
                }

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