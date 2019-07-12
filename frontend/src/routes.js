import { createStackNavigator, 
    createAppContainer, 
    createSwitchNavigator } from 'react-navigation';

import MainAuth from "./pages/Auth/MainAuth";
import SignUp from "./pages/Auth/SignUp";
import UserSignUp from "./pages/Auth/UserSignUp";
import MaidSignUp from "./pages/Auth/MaidSignUp"
import AuthLoading from "./pages/Auth/AuthLoading"

import MainAppScreen from './pages/App/MainApp'
import SideBarScreen from './pages/App/Sidebar'
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

const AppNavigator = createStackNavigator({
    MainAppScreen:{
        screen: MainAppScreen
    },
    SideBarScreen:{
        screen: SideBarScreen
    }
});

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