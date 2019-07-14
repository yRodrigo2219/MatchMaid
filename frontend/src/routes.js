import { createStackNavigator, 
    createAppContainer, 
    createSwitchNavigator,
    createDrawerNavigator,
    createMaterialTopTabNavigator } from 'react-navigation';

import MainAuth from "./pages/Auth/MainAuth";
import SignUp from "./pages/Auth/SignUp";
import UserSignUp from "./pages/Auth/UserSignUp";
import MaidSignUp from "./pages/Auth/MaidSignUp";
import AuthLoading from "./pages/Auth/AuthLoading";

import MainApp from './pages/App/MainApp';
import FilterMenu from './pages/App/FilterMenu';
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

const FilterNavigator =  createDrawerNavigator({
    MainAppScreen:{
        screen: MainApp
    }
}, {
    contentComponent: FilterMenu,
    drawerWidth: 300,
    drawerPosition: 'right'
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