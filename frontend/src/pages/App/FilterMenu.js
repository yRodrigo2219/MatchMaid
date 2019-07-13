import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';

export default class FilterMenu extends Component{
    state = {
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
        distance: 0
    }

    handleSelection = async (select) => {
        await AsyncStorage.setItem(select + "Filter", `${!this.state[select]}`);
        this.setState({[select]: !this.state[select]});
    }

    handleSliderChange = async (filterName, value) => {
        await AsyncStorage.setItem(filterName + "Filter", `${value}`);
        this.setState({[filterName]: value});
    }

    async componentDidMount(){
        this.setState({
            segunda: JSON.parse(await AsyncStorage.getItem('segundaFilter')),
            terca: JSON.parse(await AsyncStorage.getItem('tercaFilter')),
            quarta: JSON.parse(await AsyncStorage.getItem('quartaFilter')),
            quinta: JSON.parse(await AsyncStorage.getItem('quintaFilter')),
            sexta: JSON.parse(await AsyncStorage.getItem('sextaFilter')),
            sabado: JSON.parse(await AsyncStorage.getItem('sabadoFilter')),
            domingo: JSON.parse(await AsyncStorage.getItem('domingoFilter')),
            distance: Number.parseFloat(await AsyncStorage.getItem('distanceFilter'))
        })

    }

    render(){
        return(
            <ScrollView>
                <CheckBox
                    title='Segunda'
                    checked={this.state.segunda}
                    onPress={()=>this.handleSelection("segunda")}
                />

                <CheckBox
                    title='Terça'
                    checked={this.state.terca}
                    onPress={()=>this.handleSelection("terca")}
                />
                
                <CheckBox
                    title='Quarta'
                    checked={this.state.quarta}
                    onPress={()=>this.handleSelection("quarta")}
                />

                <CheckBox
                    title='Quinta'
                    checked={this.state.quinta}
                    onPress={()=>this.handleSelection("quinta")}
                />

                <CheckBox
                    title='Sexta'
                    checked={this.state.sexta}
                    onPress={()=>this.handleSelection("sexta")}
                />

                <CheckBox
                    title='Sabado'
                    checked={this.state.sabado}
                    onPress={()=>this.handleSelection("sabado")}
                />

                <CheckBox
                    title='Domingo'
                    checked={this.state.domingo}
                    onPress={()=>this.handleSelection("domingo")}
                />

                <Slider
                    value={this.state.distance}
                    onValueChange={(value) => this.handleSliderChange("distance", value)}
                />
                <Text>Value: {this.state.distance}</Text>
                
            </ScrollView>
        );
    }
}