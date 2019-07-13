import React, { Component } from 'react';
import { View,
    Text, 
    Button,
    AsyncStorage,
    FlatList } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import RemoveAccents from 'remove-accents';

export default class MainApp extends Component{
    state = {
        drawer: false,
        maidData: [],
        value: ""
    }

    arrayHolder = [];

    handleSignOut = async ()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    getMaidData = async () =>{
        let data = [{name: "João", value: 25.20, days:{domingo:true, segunda:true}, services:{preco_hora: 5.50,baba:true,lavar_roupa: true,}},{ name: "Lucas", value: 12.50, days:{domingo:false, segunda:true}, services:{baba:true} }];
        this.setState({maidData: data});
        this.arrayHolder = data;
    }

    componentDidMount(){
        this.getMaidData();
    }

    renderDays = days =>{
        let key = Object.keys(days);
        let arr = [];

        for(let i=0; i < key.length; i++){
            if(days[key[i]]){
                let str = key[i].charAt(0).toUpperCase() + key[i].slice(1);
                arr.push(<Text key={i}>{"* " + str}</Text>);
            }
        }
        return arr;
    }

    renderServices = services =>{
        let key = Object.keys(services);
        let arr = [];

        for(let i=0; i < key.length; i++){
            if(services[key[i]] && key[i] !== "preco_hora"){
                let str = key[i].charAt(0).toUpperCase() + key[i].slice(1);
                str = str.replace(/_/g, " ");
                if(str === "Baba") str = "Babá";
                arr.push(<Text key={i}>{"* " + str}</Text>);
            }
        }
        return arr;
    }

    toFixedTwo = preco => {
        if(!preco){
            return "???.??";
        }
        return preco.toFixed(2);
    }

    renderMaidList = ({item}) => (
        <View style={{marginTop:10, marginHorizontal:5}}>
            <View>
                <Text>Image Here</Text>

                <View>
                    <Text>{item.name}</Text>
                    <Text>R$ {this.toFixedTwo(item.services.preco_hora)}</Text>
                </View>
            </View>

            <Grid>
                <Col>
                    <Text>Dias Disponíveis</Text>
                    {this.renderDays(item.days)}
                </Col>

                <Col>
                    <Text>Serviços</Text>
                    {this.renderServices(item.services)}
                </Col>
            </Grid>
        </View>
    )

    searchFilterFunction = text => {
        this.setState({
            value: text
        });
        
        const newData = this.arrayHolder.filter(item => {
            var itemData = `${item.name.toUpperCase()}`;
            itemData = RemoveAccents(itemData);
            var textData = text.toUpperCase();
            textData = RemoveAccents(textData);
      
            return itemData.indexOf(textData) > -1;
        });
        
        this.setState({ maidData: newData });
    };

    render(){
        return(
            <View>
                <SearchBar        
                    placeholder="Type Here..."        
                    lightTheme        
                    round        
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                    value={this.state.value}      
                />

                <Button
                    title="Sign Out"
                    onPress={this.handleSignOut}
                />

                <Button
                    title='Filter'
                    onPress={() => this.props.navigation.toggleDrawer()}
                />

                <Button
                    title="^"
                    onPress={() => this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})}
                />

                <FlatList
                    ref="listRef"
                    data={this.state.maidData}
                    renderItem={this.renderMaidList}
                    keyExtractor={item => item.name}/>

            </View>
        );
    }
}