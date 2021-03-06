import React, { Component } from 'react';
import { ScrollView, 
    TextInput, 
    Text,
    TouchableOpacity,
    View,
    Alert,
    AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import GStyles from '../GlobalStyle';
import UserStyles from '../Auth/Styles/UserSignUpStyles';

export default class UserSignUp extends Component{
    state = {
        userinfo:{
            nome: "",
            celular: "",
            email: "",
            senha: "",
            idade: "",
            rg: "",
            cpf: ""
        },
        localizacao:{
            estado: "",
            cidade: "",
            cep: "",
            endereco: "",
            latitude: 0.0,
            longitude: 0.0
        }
    }

    colorValidation = {
        email: false,
        senha: false,
        cpf: false
    }

    toTitleCase = (str) => {
        return str.replace(/\w\S*/g, (txt)=>{
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    validateInput = (input, type, first, second) => {
        const filterChars = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/;
        const fitlerNumbers = /^[0-9]+$/;
        const filterCharsNumbers = /^([0-9A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/;
        const filterEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if(type === 'chars'){
            if((filterChars.test(input)|| input === "") && input.length <= 18){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: this.toTitleCase(input).replace(/\s\s+/g, ' ')
                    }
                }));
            }
        }else if(type === 'age'){
            if((fitlerNumbers.test(input) || input === "") && input.length <= 2){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: input
                    }
                }));
            }
        }else if(type === 'email'){
            if(input.length <= 40){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: input
                    }
                }));

                (filterEmail.test(input) && input !== "") ? this.colorValidation.email = true : this.colorValidation.email = false;
            }
        }else if(type === 'password'){
            if(input.length <= 20){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: input
                    }
                }), ()=>{
                    (this.state.userinfo.senha === this.state.userinfo.confSenha && this.state.userinfo.senha.length >=8) ? this.colorValidation.senha = true : this.colorValidation.senha = false;
                });
            }
        }else if(type === 'CEP'){
            if((fitlerNumbers.test(input) || input === "") && input.length <= 8){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: input
                    }
                }));
            }
        }else if(type === 'endereco'){
            if((filterCharsNumbers.test(input)|| input === "") && input.length <= 45){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: this.toTitleCase(input).replace(/\s\s+/g, ' ')
                    }
                }));
            }
        }else if(type === 'CPF'){
            if((fitlerNumbers.test(input) || input === "") && input.length <= 11){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: input
                    }
                }));
            }
        }else if(type === 'RG'){
            if((fitlerNumbers.test(input) || input === "") && input.length <= 13){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: input
                    }
                }));
            }
        }
    }

    requestLocalizationPermission = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== "granted"){
            alert("Por favor nos de permissão para acessar sua localização!");
        }else{
            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            this.setState(prevState => ({
                localizacao:{
                    ...prevState.localizacao,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
            }));
            await AsyncStorage.setItem("UserLatitude", (location.coords.latitude).toFixed(4).toString());
            await AsyncStorage.setItem("UserLongitude", (location.coords.longitude).toFixed(4).toString());
            Alert.alert("Localização",`Latitude: ${location.coords.latitude} Longitude: ${location.coords.longitude}`);
        }

        
    }

    handleSignUp = ()=>{
        fetch(`http://192.168.56.1:8080/signup?maid=false`,{
            method: 'post',
            headers:{
                "Content-Type": 'application/json'
            },
            body:JSON.stringify(this.state)
        }).then((res)=>{
            return res.json();
        }).then(async(res)=>{
            if(res){
                await AsyncStorage.setItem('userToken', "true");
                await AsyncStorage.setItem('userType', "User");
                this.props.navigation.navigate('AuthLoading');
            }else{
                alert(res);
            }
        });
    }

    render(){
        return(
            <ScrollView >
                <View style = {[UserStyles.alinhamento]}>
                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Nome"
                        value={this.state.userinfo.nome}
                        onChangeText={(text) => this.validateInput(text, 'chars', 'userinfo', 'nome')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Sobrenome"
                        value={this.state.userinfo.sobrenome}
                        onChangeText={(text) => this.validateInput(text, 'chars', 'userinfo', 'sobrenome')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Email"
                        value={this.state.userinfo.email}
                        onChangeText={(text) => this.validateInput(text, 'email', 'userinfo', 'email')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Senha"
                        value={this.state.userinfo.senha}
                        onChangeText={(text) => this.validateInput(text, 'password', 'userinfo', 'senha')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                        secureTextEntry={true}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Confirmar Senha"
                        value={this.state.userinfo.confSenha}
                        onChangeText={(text) => this.validateInput(text, 'password', 'userinfo', 'confSenha')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                        secureTextEntry={true}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Idade"
                        value={this.state.userinfo.idade}
                        onChangeText={(text) => this.validateInput(text, 'age', 'userinfo', 'idade')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="CPF"
                        value={this.state.userinfo.cpf}
                        onChangeText={(text) => this.validateInput(text, 'CPF', 'userinfo', 'cpf')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="RG"
                        value={this.state.userinfo.rg}
                        onChangeText={(text) => this.validateInput(text, 'RG', 'userinfo', 'rg')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Celular"
                        value={this.state.userinfo.celular}
                        onChangeText={(text) => this.validateInput(text, 'RG', 'userinfo', 'celular')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Cidade"
                        value={this.state.localizacao.cidade}
                        onChangeText={(text) => this.validateInput(text, 'chars', 'localizacao', 'cidade')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Estado"
                        value={this.state.localizacao.estado}
                        onChangeText={(text) => this.validateInput(text, 'chars', 'localizacao', 'estado')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />

                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="CEP"
                        value={this.state.localizacao.cep}
                        onChangeText={(text) => this.validateInput(text, 'CEP', 'localizacao', 'cep')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />
                    
                    <TextInput
                        style = {[GStyles.textInputGlobal,GStyles.fonte]}
                        placeholder="Endereço"
                        value={this.state.localizacao.endereco}
                        onChangeText={(text) => this.validateInput(text, 'endereco', 'localizacao', 'endereco')}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />
                    
                    <TouchableOpacity
                        style = { [GStyles.buttonGlobal] }
                        onPress={this.requestLocalizationPermission}>
                             <Text>Conseguir Localização</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = { [GStyles.buttonGlobal, {marginBottom: 15}] }                       
                        onPress={this.handleSignUp}>
                            <Text>Confirmar Cadastro</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }
}