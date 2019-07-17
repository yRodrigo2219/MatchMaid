import React, { Component } from 'react';
import { View,
    Text, 
    Button,
    AsyncStorage,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Linking } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import RemoveAccents from 'remove-accents';

import Style from './Styles/MainStyle';

export default class MainApp extends Component{
    state = {
        drawer: false,
        maidData: [],
        value: "",
        userInfo: {
            lat: -0.002,
            long: 0
        },
        isLoading: false
    }

    filterObject = {
        
    }

    arrayHolder = [];

    getMaidData = async () =>{
        let data = await fetch(`http://192.168.56.1:8080/?lat=${Number.parseFloat(await AsyncStorage.getItem("UserLatitude"))}&long=${Number.parseFloat(await AsyncStorage.getItem("UserLongitude"))}`,{
            method: 'get'
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
            return res;
        });
        this.setState({maidData: data});
        this.arrayHolder = data;
    }

    async componentDidMount(){
        this.filterObject = {
            dias:{
                segunda: JSON.parse(await AsyncStorage.getItem('segundaFilter')) || false,
                terca: JSON.parse(await AsyncStorage.getItem('tercaFilter')) || false,
                quarta: JSON.parse(await AsyncStorage.getItem('quartaFilter')) || false,
                quinta: JSON.parse(await AsyncStorage.getItem('quintaFilter')) || false,
                sexta: JSON.parse(await AsyncStorage.getItem('sextaFilter')) || false,
                sabado: JSON.parse(await AsyncStorage.getItem('sabadoFilter')) || false, 
                domingo: JSON.parse(await AsyncStorage.getItem('domingoFilter')) || false
            },
            serv:{
                baba: JSON.parse(await AsyncStorage.getItem('babaFilter')) || false,
                limpar_casa: JSON.parse(await AsyncStorage.getItem('limpar_casaFilter')) || false,
                lavar_louca: JSON.parse(await AsyncStorage.getItem('lavar_loucaFilter')) || false,
                lavar_roupa: JSON.parse(await AsyncStorage.getItem('lavar_roupaFilter')) || false,
                cuidar_casa: JSON.parse(await AsyncStorage.getItem('cuidar_casaFilter')) || false,
                cozinhar: JSON.parse(await AsyncStorage.getItem('cozinharFilter')) || false
            },
            distance: Number.parseFloat(await AsyncStorage.getItem('distanceFilter')) || 1,
            preco_hora: Number.parseFloat(await AsyncStorage.getItem('preco_horaFilter')) || 100
        }

        await this.getMaidData();
        this.searchFilterFunction(this.state.value);
        this.isDrawerClosed();
    }

    isDrawerClosed = () => {
        setInterval(async ()=>{
            if(await AsyncStorage.getItem('DrawerState') === "Closed"){
                this.filterObject = {
                    dias:{
                        segunda: JSON.parse(await AsyncStorage.getItem('segundaFilter')) || false,
                        terca: JSON.parse(await AsyncStorage.getItem('tercaFilter')) || false,
                        quarta: JSON.parse(await AsyncStorage.getItem('quartaFilter')) || false,
                        quinta: JSON.parse(await AsyncStorage.getItem('quintaFilter')) || false,
                        sexta: JSON.parse(await AsyncStorage.getItem('sextaFilter')) || false,
                        sabado: JSON.parse(await AsyncStorage.getItem('sabadoFilter')) || false, 
                        domingo: JSON.parse(await AsyncStorage.getItem('domingoFilter')) || false
                    },
                    serv:{
                        baba: JSON.parse(await AsyncStorage.getItem('babaFilter')) || false,
                        limpar_casa: JSON.parse(await AsyncStorage.getItem('limpar_casaFilter')) || false,
                        lavar_louca: JSON.parse(await AsyncStorage.getItem('lavar_loucaFilter')) || false,
                        lavar_roupa: JSON.parse(await AsyncStorage.getItem('lavar_roupaFilter')) || false,
                        cuidar_casa: JSON.parse(await AsyncStorage.getItem('cuidar_casaFilter')) || false,
                        cozinhar: JSON.parse(await AsyncStorage.getItem('cozinharFilter')) || false
                    },
                    distance: Number.parseFloat(await AsyncStorage.getItem('distanceFilter')) || 1,
                    preco_hora: Number.parseFloat(await AsyncStorage.getItem('preco_horaFilter')) || 100
                }
                this.searchFilterFunction(this.state.value);
                await AsyncStorage.setItem('DrawerState', "");
            }
        }, 1000);
    }

    renderDays = days =>{
        let key = Object.keys(days);
        let arr = [];

        for(let i=0; i < key.length; i++){
            if(days[key[i]]){
                let str = key[i].charAt(0).toUpperCase() + key[i].slice(1);
                arr.push(<Text key={i}>{"✓ " + str}</Text>);
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
                arr.push(<Text key={i}>{"✓ " + str}</Text>);
            }
        }
        return arr;
    }

    getDistance = (item) => {
        let local = item.localizacao;
        const R = 6371e3;
        const pi = Math.PI;

        let lat1 = this.state.userInfo.lat;
        let long1 = this.state.userInfo.long;

        let lat2 = local.latitude;
        let long2 = local.longitude;

        let φ1 = lat1 * (pi/180);
        let φ2 = lat2 * (pi/180);
        let Δφ = (lat2-lat1) * (pi/180);
        let Δλ = (long2-long1) * (pi/180);

        let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        let d = R * c;

        d /= 1000;
        d = d.toFixed(2);

        return d + " Km";
    }

    renderMaidList = ({item}) => (
        <View style={Style.maidProfile}>
            <View style={Style.perfil}>
                <Image style={Style.perfilImage} source={require('../../img/userImg.png')}/>

                <View style={{flex:1}}>
                    <Text style={Style.namePerfil}>{item.userinfo.nome}</Text>
                    <View style={Style.subPerfil}>
                        <View>
                            <Text style={Style.valuePerfil}>{item.servicos.preco_hora}/h</Text>
                            <Text style={Style.distancePerfil}>{item.distancia} Km</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.shareToWhatsAppWithContact(item.userinfo.celular)}>
                            <Image style={Style.wppImage} source={require('../../img/wppIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Grid>
                <Col>
                    <Text>Dias Disponíveis</Text>
                    {this.renderDays(item.dias_da_semana)}
                </Col>

                <Col>
                    <Text>Serviços</Text>
                    {this.renderServices(item.servicos)}
                </Col>
            </Grid>
        </View>
    )

    searchFilterFunction = text => {
        this.setState({
            value: text
        });

        
        const newData = this.arrayHolder.filter(item => {
            let keyDays = Object.keys(this.filterObject.dias);
            let keyServ = Object.keys(this.filterObject.serv);

            let itemData = `${item.userinfo.nome.toUpperCase()}`;
            itemData = RemoveAccents(itemData);
            let textData = text.toUpperCase();
            textData = RemoveAccents(textData);

            if( itemData.indexOf(textData) > -1 ){
                for(let i = 0; i < keyDays.length; i++){
                    if(this.filterObject.dias[keyDays[i]]){
                        if(!item.dias_da_semana[keyDays[i]]) return false;
                    }
                }

                for(let i = 0; i < keyServ.length; i++){
                    if(this.filterObject.serv[keyServ[i]]){
                        if(!item.servicos[keyServ[i]]) return false;
                    }
                }

                if(this.filterObject.distance < item.distancia) return false;

                return true;
            }else{
                return false;
            }
        });

        this.setState({ maidData: newData });
    }

    shareToWhatsAppWithContact = (phone) => {
        Linking.openURL(`whatsapp://send?text="Eu cheguei a você pelo App MatchMaid!"&phone=${phone}`);
    }

    renderHeader = ()=>{
        return(
            <View style={Style.filterView}>
                <View style={Style.filterSearch}>
                    <SearchBar        
                        placeholder="Digite o nome aqui"        
                        lightTheme        
                        round        
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        value={this.state.value}
                        containerStyle={{backgroundColor: 'transparent',borderBottomColor: 'transparent'}}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                    />
                </View>


                <TouchableOpacity
                    onPress={() => this.props.navigation.toggleDrawer()}
                    style={Style.filterButton}>
                        <Image style={Style.filterImage} source={require("../../img/filterFilter.png")}/>
                </TouchableOpacity>
            </View>
        );
    }

    renderFooter = () =>{
        if(!this.state.isLoading) return null;

        return (
            <View
              style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
              }}
            >
              <ActivityIndicator animating size="large" />
            </View>
          );
    }

    render(){
        return(
            <View>
                <FlatList
                    ref="listRef"
                    data={this.state.maidData}
                    renderItem={this.renderMaidList}
                    keyExtractor={item => item.userinfo.email}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}/>
                {
                    this.state.maidData.length > 3 
                    ? <TouchableOpacity
                        style={Style.toTopButton}
                        onPress={() => this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})}>
                            <Image style={Style.toTopImage} source={require("../../img/backToTop.png")}/>
                    </TouchableOpacity> : null
                }
            </View>
        );
    }
}