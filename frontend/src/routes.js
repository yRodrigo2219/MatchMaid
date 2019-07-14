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
import Tab from './pages/App/Tab';

const AuthNavigator = createStackNavigator({
    MainAuthScreen:{
        screen: UserSignUp
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
    TabScreen:{
        screen: Tab
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