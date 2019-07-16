import { createStackNavigator, 
    createAppContainer, 
    createSwitchNavigator,
    createMaterialTopTabNavigator } from 'react-navigation';

import MainAuth from "./pages/Auth/MainAuth";
import SignUp from "./pages/Auth/SignUp";
import UserSignUp from "./pages/Auth/UserSignUp";
import MaidSignUp from "./pages/Auth/MaidSignUp";
import AuthLoading from "./pages/Auth/AuthLoading";

import FilterNavigator from './drawerRoute';
import ConfigTab from './pages/App/ConfigTab';

const AuthNavigator = createStackNavigator({
    MainAuthScreen:{
        screen: MainAuth
    },
    SignUpScreen:{
        screen: SignUp
    },
    UserSignUpScreen:{
        screen: UserSignUp
    },
    MaidSignUpScreen:{
        screen: MaidSignUp
    }
});

const AppNavigator = createMaterialTopTabNavigator({
    MainAppScreen:{
        screen: FilterNavigator
    },
    ConfigTabScreen:{
        screen: ConfigTab
    }
})

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: AppNavigator,
        Auth: AuthNavigator
    },
    {
        initialRouteName: 'AuthLoading'
    }
));