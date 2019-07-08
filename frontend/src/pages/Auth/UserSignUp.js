import React, { Component } from 'react';
import { View, 
    TextInput, 
    Button,
    Text } from 'react-native';
import { CheckBox,
    Slider } from 'react-native-elements';


export default class UserSignUp extends Component{
    state = {
        dias_da_semana:{
            domingo: false
        },
        servicos:{
            baba: false
        },
        value: 0
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
                    placeholder="User Sign Up"
                />

                <CheckBox
                    title='Domingo'
                    checked={this.state.dias_da_semana.domingo}
                    onPress={()=>{this.handleCheckSelection("dias_da_semana","domingo")}}
                />

                <CheckBox
                    title='Babá'
                    checked={this.state.servicos.baba}
                    onPress={()=>{this.handleCheckSelection("servicos","baba")}}
                />

                <Slider
                    value={this.state.value}
                    onValueChange={value => this.setState({ value })}
                />
                <Text>Value: {this.state.value}</Text>

                <Button
                    title="Sign Up"
                />

            </View>
        );
    }
}