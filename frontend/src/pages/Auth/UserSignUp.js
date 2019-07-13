import React, { Component } from 'react';
import { ScrollView, 
    TextInput, 
    Button,
    Text } from 'react-native';
import { CheckBox,
    Slider } from 'react-native-elements';


export default class UserSignUp extends Component{
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
        value : 0
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
            <ScrollView>
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

                <Slider
                    value={this.state.value}
                    onValueChange={value => this.setState({ value })}
                />
                <Text>Value: {this.state.value}</Text>

                <Button
                    title="Sign Up"
                />

            </ScrollView>
        );
    }
}