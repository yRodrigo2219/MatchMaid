import React, { Component } from 'react';
import { View, 
    Text, 
    Button,
    StyleSheet,
    AsyncStorage } from 'react-native';
import { Drawer,
    Container,
    Header } from 'native-base';

export default class MainApp extends Component{
    handleSignOut = async ()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };    

    render(){
        return(
            <View>  
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar navigator={this.navigator} />}
                    onClose={() => this.closeDrawer()}>
                    <Container>
                        <Header>
                            <Container style={{flexDirection: 'row'}}>
                                    <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="#fff" />
                            </Container>
                        </Header>
                    
                        <View style={styles.container}>
                            <Text style={styles.welcome}>
                                Welcome to React Native!
                            </Text>
                            <Text style={styles.instructions}>
                                To get started, edit App.js
                            </Text>
                        </View>
                    
                    </Container>
                </Drawer>          
                
                <Text>Main App Page</Text>
                
                <Button
                    title="Sign Out"
                    onPress={this.handleSignOut}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });