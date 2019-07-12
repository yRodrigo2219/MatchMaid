import React, { Component } from 'react';
import { View, 
    Text, 
    Button, 
    TextInput } from 'react-native';


export default class UserPerfilScreen extends Component{
    state={ 
        nome:'',
        email:'',
        
        dias_da_semana:{
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false
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

    handleSignInAction = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    }

    render(){

        const nome = this.state.nome;
        const email = this.state.email;

        return(
            <View>
                
                <Text>Perfil Usuário</Text>
                
                <TextInput
                    placeholder="Nome"
                />

                <TextInput
                    placeholder="Email"
                />

                <CheckBox
                    title='Domingo'
                    checked={this.state.dias_da_semana.domingo}
                    onPress={()=>{this.handleCheckSelection("dias_da_semana","domingo")}}
                />

                <CheckBox
                    title='Segunda'
                    checked={this.state.dias_da_semana.segunda}
                    onPress={()=>{this.handleCheckSelection("dias_da_semana","segunda")}}
                />

                <CheckBox
                    title='Terça'
                    checked={this.state.dias_da_semana.terca}
                    onPress={()=>{this.handleCheckSelection("dias_da_semana","terca")}}
                />

                <CheckBox
                    title='Quarta'
                    checked={this.state.dias_da_semana.quarta}
                    onPress={()=>{this.handleCheckSelection("dias_da_semana","quarta")}}
                />

                <CheckBox
                    title='Quinta'
                    checked={this.state.dias_da_semana.quinta}
                    onPress={()=>{this.handleCheckSelection("dias_da_semana","quinta")}}
                />

                <CheckBox
                    title='Sexta'
                    checked={this.state.dias_da_semana.sexta}
                    onPress={()=>{this.handleCheckSelection("dias_da_semana","sexta")}}
                />

                <CheckBox
                    title='Sábado'
                    checked={this.state.dias_da_semana.sabado}
                    onPress={()=>{this.handleCheckSelection("dias_da_semana","sabado")}}
                />

                <Text> Tipos de Trabalho</Text>

                <CheckBox
                    title='Babá'
                    checked={this.state.servicos.baba}
                    onPress={()=>{this.handleCheckSelection("servicos","baba")}}
                />

                <CheckBox
                    title='Lavar Louça'
                    checked={this.state.servicos.lavar_louca}
                    onPress={()=>{this.handleCheckSelection("servicos","lavar_louca")}}
                />

                <CheckBox
                    title='Lavar Roupa'
                    checked={this.state.servicos.lavar_roupa}
                    onPress={()=>{this.handleCheckSelection("servicos","lavar_roupa")}}
                />

                <CheckBox
                    title='Cuidar da Casa'
                    checked={this.state.servicos.cuidar_casa}
                    onPress={()=>{this.handleCheckSelection("servicos","cuidar_casa")}}
                />

                <CheckBox
                    title='Limpar Casa'
                    checked={this.state.servicos.limpar_casa}
                    onPress={()=>{this.handleCheckSelection("servicos","limpar_casa")}}
                />

                <CheckBox
                    title='Cozinhar'
                    checked={this.state.servicos.cozinhar}
                    onPress={()=>{this.handleCheckSelection("servicos","cozinhar")}}
                /><Text> Tipos de Trabalho</Text>

                <CheckBox
                    title='Babá'
                    checked={this.state.servicos.baba}
                    onPress={()=>{this.handleCheckSelection("servicos","baba")}}
                />

                <CheckBox
                    title='Lavar Louça'
                    checked={this.state.servicos.lavar_louca}
                    onPress={()=>{this.handleCheckSelection("servicos","lavar_louca")}}
                />

                <CheckBox
                    title='Lavar Roupa'
                    checked={this.state.servicos.lavar_roupa}
                    onPress={()=>{this.handleCheckSelection("servicos","lavar_roupa")}}
                />

                <CheckBox
                    title='Cuidar da Casa'
                    checked={this.state.servicos.cuidar_casa}
                    onPress={()=>{this.handleCheckSelection("servicos","cuidar_casa")}}
                />

                <CheckBox
                    title='Limpar Casa'
                    checked={this.state.servicos.limpar_casa}
                    onPress={()=>{this.handleCheckSelection("servicos","limpar_casa")}}
                />

                <CheckBox
                    title='Cozinhar'
                    checked={this.state.servicos.cozinhar}
                    onPress={()=>{this.handleCheckSelection("servicos","cozinhar")}}
                />

                <Button
                    title="Salvar"
                    onPress={this.handl}
                />

                <Button
                    title="Sair"
                    onPress={this.handleSignOut}
                />
            </View>
        );
    }
}