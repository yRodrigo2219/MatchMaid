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