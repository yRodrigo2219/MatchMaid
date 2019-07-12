import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class SideBar extends Component {
    
    
    render(){
        
        return (
                <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
                        <Text>
                            <Icon name="rocket" size={30} color="#900" />
                        </Text>
                </View>
               );
    } 
};