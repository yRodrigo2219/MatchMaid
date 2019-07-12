import React, { Component } from 'react';
import { View, 
    TextInput, 
    Button,
    Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class MaidSignUp extends Component{
    state = {
        dias_da_semana:{
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false
        },
        servicos:{
            baba: false,
            limpar_casa: false,
            lavar_louca: false,
            lavar_roupa: false,
            cuidar_casa: false,
            cozinhar: false
        },
    }

    handleCheckSelection = (first, second) =>{
        this.setState(prevState => ({
            [`${first}`]:{
                ...prevState[`${first}`],
                [`${second}`]: !prevState[`${first}`][`${second}`]
            }
        }));
    }

    render(){
        return(
            <View>
                <TextInput
                    placeholder="Nome"
                />

                <TextInput
                    placeholder="Sobrenome"
                 />

                <TextInput
                    placeholder="Cidade"
                />

                <TextInput
                    placeholder="Estado"
                />

                <TextInput
                    placeholder="CEP"
                />
                
                <TextInput
                    placeholder="Endereço"
                />

                <TextInput
                    placeholder="Email"
                 />

                <TextInput
                    placeholder="CPF"
                />

                <TextInput
                    placeholder="RG"
                />

                <Text> Dias da Semana</Text>

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
                />

                <Button
                    title="Cadastrar"
                />

            </View>
        );
    }
}