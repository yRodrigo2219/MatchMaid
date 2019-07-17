import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';

import GStyles from '../GlobalStyle';

export default class FilterMenu extends Component{
    state = {
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
        distance: 1,
        
        preco_hora: 100,
        baba: false,
        limpar_casa: false,
        lavar_louca: false,
        lavar_roupa: false,
        cuidar_casa: false,
        cozinhar: false        
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
            segunda: JSON.parse(await AsyncStorage.getItem('segundaFilter')) || false,
            terca: JSON.parse(await AsyncStorage.getItem('tercaFilter')) || false,
            quarta: JSON.parse(await AsyncStorage.getItem('quartaFilter')) || false,
            quinta: JSON.parse(await AsyncStorage.getItem('quintaFilter')) || false,
            sexta: JSON.parse(await AsyncStorage.getItem('sextaFilter')) || false,
            sabado: JSON.parse(await AsyncStorage.getItem('sabadoFilter')) || false,
            domingo: JSON.parse(await AsyncStorage.getItem('domingoFilter')) || false,
            distance: Number.parseFloat(await AsyncStorage.getItem('distanceFilter')) || 1,
            preco_hora: Number.parseFloat(await AsyncStorage.getItem('preco_horaFilter')) || 100,
            baba: JSON.parse(await AsyncStorage.getItem('babaFilter')) || false,
            limpar_casa: JSON.parse(await AsyncStorage.getItem('limpar_casaFilter')) || false,
            lavar_louca: JSON.parse(await AsyncStorage.getItem('lavar_loucaFilter')) || false,
            lavar_roupa: JSON.parse(await AsyncStorage.getItem('lavar_roupaFilter')) || false,
            cuidar_casa: JSON.parse(await AsyncStorage.getItem('cuidar_casaFilter')) || false,
            cozinhar: JSON.parse(await AsyncStorage.getItem('cozinharFilter')) || false

        })

    }

    render(){
        return(
            <ScrollView>
                <Text style={GStyles.fonte}> Dias Disponiveis</Text>
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

                <Text style={GStyles.fonte}> Tipos de Trabalho</Text>

                <CheckBox
                    style = {GStyles.check}
                    title='Babá'
                    checked={this.state.baba}
                    onPress={()=>{this.handleSelection("baba")}}
                />

                <CheckBox
                    style = {GStyles.check}
                    title='Lavar Louça'
                    checked={this.state.lavar_louca}
                    onPress={()=>{this.handleSelection("lavar_louca")}}
                />

                <CheckBox
                    style = {GStyles.check}
                    title='Lavar Roupa'
                    checked={this.state.lavar_roupa}
                    onPress={()=>{this.handleSelection("lavar_roupa")}}
                />

                <CheckBox
                    style = {GStyles.check}
                    title='Cuidar da Casa'
                    checked={this.state.cuidar_casa}
                    onPress={()=>{this.handleSelection("cuidar_casa")}}
                />

                <CheckBox
                    style = {GStyles.check}
                    title='Limpar Casa'
                    checked={this.state.limpar_casa}
                    onPress={()=>{this.handleSelection("limpar_casa")}}
                />

                <CheckBox
                    style = {GStyles.check}
                    title='Cozinhar'
                    checked={this.state.cozinhar}
                    onPress={()=>{this.handleSelection("cozinhar")}}
                />

                <Slider
                    value={this.state.distance}
                    onValueChange={(value) => this.handleSliderChange("distance", value)}
                    maximumValue={100}
                    minimumValue={1}
                    step={0.5}
                    thumbTintColor={"#0000ff"}
                />
                <Text>Distancia: {this.state.distance} Km</Text>
                
            </ScrollView>
        );
    }
}