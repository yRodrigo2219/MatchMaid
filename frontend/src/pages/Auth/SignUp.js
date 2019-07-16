import React, { Component } from 'react';

import { View,
     Text,
     TouchableOpacity } from 'react-native';
import GStyles from '../GlobalStyle';
import SignUpStyles from './Styles/SignUpStyles';

export default class SignUp extends Component{
    render(){
        return(
            <View style = {GStyles.alinhamento}>
                <Text>Como irá usar o Match Maid?</Text>
                    
                    <TouchableOpacity
                        style = { [GStyles.buttonGlobal,SignUpStyles.buttonSignUp] }
                        onPress={() => this.props.navigation.navigate('UserSignUpScreen')}>
                             <Text>Usuário</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = { [GStyles.buttonGlobal,SignUpStyles.buttonSignUp] }                       
                        onPress={() => this.props.navigation.navigate('MaidSignUpScreen')}>
                            <Text>Diarista</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}