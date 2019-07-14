import React, { Component } from 'react';
import { ScrollView, 
    TextInput, 
    Button,
    Text,
    Image } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class UserSignUp extends Component{
    state = {
        userinfo:{
            nome: "",
            celular: "",
            email: "",
            senha: "",
            confSenha: "",
            imagem: null,
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
            console.warn('Denied!');
        }else{
            console.warn('Granted!');
        }

        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        this.setState(prevState => ({
            localizacao:{
                ...prevState.localizacao,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        }));
    }

    render(){
        return(
            <ScrollView>
                <TextInput
                    placeholder="Nome"
                    value={this.state.userinfo.nome}
                    onChangeText={(text) => this.validateInput(text, 'chars', 'userinfo', 'nome')}
                />

                <TextInput
                    placeholder="Sobrenome"
                    value={this.state.userinfo.sobrenome}
                    onChangeText={(text) => this.validateInput(text, 'chars', 'userinfo', 'sobrenome')}
                />

                <TextInput
                    placeholder="Email"
                    value={this.state.userinfo.email}
                    onChangeText={(text) => this.validateInput(text, 'email', 'userinfo', 'email')}
                 />

                <TextInput
                    placeholder="Senha"
                    value={this.state.userinfo.senha}
                    onChangeText={(text) => this.validateInput(text, 'password', 'userinfo', 'senha')}
                    secureTextEntry={true}
                />

                <TextInput
                    placeholder="Confirmar Senha"
                    value={this.state.userinfo.confSenha}
                    onChangeText={(text) => this.validateInput(text, 'password', 'userinfo', 'confSenha')}
                    secureTextEntry={true}
                />

                <TextInput
                    placeholder="Idade"
                    value={this.state.userinfo.idade}
                    onChangeText={(text) => this.validateInput(text, 'age', 'userinfo', 'idade')}
                />

                <TextInput
                    placeholder="CPF"
                    value={this.state.userinfo.cpf}
                    onChangeText={(text) => this.validateInput(text, 'CPF', 'userinfo', 'cpf')}
                />

                <TextInput
                    placeholder="RG"
                    value={this.state.userinfo.rg}
                    onChangeText={(text) => this.validateInput(text, 'RG', 'userinfo', 'rg')}
                />

                <TextInput
                    placeholder="Cidade"
                    value={this.state.localizacao.cidade}
                    onChangeText={(text) => this.validateInput(text, 'chars', 'localizacao', 'cidade')}
                />

                <TextInput
                    placeholder="Estado"
                    value={this.state.localizacao.estado}
                    onChangeText={(text) => this.validateInput(text, 'chars', 'localizacao', 'estado')}
                />

                <TextInput
                    placeholder="CEP"
                    value={this.state.localizacao.cep}
                    onChangeText={(text) => this.validateInput(text, 'CEP', 'localizacao', 'cep')}
                />
                
                <TextInput
                    placeholder="Endereço"
                    value={this.state.localizacao.endereco}
                    onChangeText={(text) => this.validateInput(text, 'endereco', 'localizacao', 'endereco')}
                />

                <Button title="Get Pos" onPress={this.requestLocalizationPermission}/>

                <Button
                    title="Sign Up"
                />
            
            </ScrollView>
        );
    }
}