import React, { Component } from 'react';
import { ScrollView, 
    TextInput, 
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
 
import GStyles from '../GlobalStyle';
import UserStyles from '../Auth/Styles/UserSignUpStyles';

export default class MaidSignUp extends Component{
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
        },
        dias_disponiveis:{
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false
        },
        servicos:{
            preco_hora: "",
            baba: false,
            limpar_casa: false,
            lavar_louca: false,
            lavar_roupa: false,
            cuidar_casa: false,
            cozinhar: false
        }
    }

    confSenha = "";

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
        const filterPreco = /^R*\$* *[0-9]+$/;


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
                    (this.state.userinfo.senha === confSenha && this.state.userinfo.senha.length >=8) ? this.colorValidation.senha = true : this.colorValidation.senha = false;
                });
            }
        }else if(type === 'confSenha'){
            if(input.length <= 20){
                this.confSenha = input;
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
        }else if(type === 'precoHora'){
            if((filterPreco.test(input) || input === "" || input === "R$ ") && input.length <= 7){
                this.setState(prevState => ({
                    [`${first}`]:{
                        ...prevState[`${first}`],
                        [`${second}`]: (input.indexOf('R$') > -1) ? input : "R$ " + input
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

    handleCheckSelection = (first, second) =>{
        this.setState(prevState => ({
            [`${first}`]:{
                ...prevState[`${first}`],
                [`${second}`]: !prevState[`${first}`][`${second}`]
            }
        }));
    }

    handleSignUp = ()=>{
        fetch(`http://192.168.56.1:8080/signup?maid=true`,{
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
            <ScrollView>
                <View style = {GStyles.alinhamentoSemMargem}>
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
                        value={this.confSenha}
                        onChangeText={(text) => this.validateInput(text, 'confSenha', 'userinfo', 'confSenha')}
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
                </View> 

                <View>
                    <Text style={[GStyles.fonte, {fontSize: 22, margin: 5}]}> Dias da Semana</Text>

                    <CheckBox
                        style = {GStyles.check}
                        title='Domingo'
                        checked={this.state.dias_disponiveis.domingo}
                        onPress={()=>{this.handleCheckSelection("dias_disponiveis","domingo")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Segunda'
                        checked={this.state.dias_disponiveis.segunda}
                        onPress={()=>{this.handleCheckSelection("dias_disponiveis","segunda")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Terça'
                        checked={this.state.dias_disponiveis.terca}
                        onPress={()=>{this.handleCheckSelection("dias_disponiveis","terca")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Quarta'
                        checked={this.state.dias_disponiveis.quarta}
                        onPress={()=>{this.handleCheckSelection("dias_disponiveis","quarta")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Quinta'
                        checked={this.state.dias_disponiveis.quinta}
                        onPress={()=>{this.handleCheckSelection("dias_disponiveis","quinta")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Sexta'
                        checked={this.state.dias_disponiveis.sexta}
                        onPress={()=>{this.handleCheckSelection("dias_disponiveis","sexta")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Sábado'
                        checked={this.state.dias_disponiveis.sabado}
                        onPress={()=>{this.handleCheckSelection("dias_disponiveis","sabado")}}
                    />

                    <Text style={[GStyles.fonte, {fontSize: 22, margin: 5}]}> Tipos de Trabalho</Text>

                    <CheckBox
                        style = {GStyles.check}
                        title='Babá'
                        checked={this.state.servicos.baba}
                        onPress={()=>{this.handleCheckSelection("servicos","baba")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Lavar Louça'
                        checked={this.state.servicos.lavar_louca}
                        onPress={()=>{this.handleCheckSelection("servicos","lavar_louca")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Lavar Roupa'
                        checked={this.state.servicos.lavar_roupa}
                        onPress={()=>{this.handleCheckSelection("servicos","lavar_roupa")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Cuidar da Casa'
                        checked={this.state.servicos.cuidar_casa}
                        onPress={()=>{this.handleCheckSelection("servicos","cuidar_casa")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Limpar Casa'
                        checked={this.state.servicos.limpar_casa}
                        onPress={()=>{this.handleCheckSelection("servicos","limpar_casa")}}
                    />

                    <CheckBox
                        style = {GStyles.check}
                        title='Cozinhar'
                        checked={this.state.servicos.cozinhar}
                        onPress={()=>{this.handleCheckSelection("servicos","cozinhar")}}
                    />
                    <View style={GStyles.alinhamentoSemMargem}>
                        <TextInput
                            style = {[GStyles.fonte,GStyles.textInputGlobal]}
                            placeholder="Valor Aproximado por Hora"
                            value={this.state.servicos.preco_hora}
                            onChangeText={(text) => this.validateInput(text, 'precoHora', 'servicos', 'preco_hora')}
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
                </View>
            </ScrollView>
        );
    }
}