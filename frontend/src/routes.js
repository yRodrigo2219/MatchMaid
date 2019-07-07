import { createStackNavigator, 
    createAppContainer, 
    createSwitchNavigator } from 'react-navigation';

import MainAuth from "./pages/Auth/MainAuth";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import UserSignUp from "./pages/Auth/UserSignUp";
import MaidSignUp from "./pages/Auth/MaidSignUp"
import AuthLoading from "./pages/Auth/AuthLoading"

import MainAppScreen from './pages/App/MainApp'

const AuthNavigator = createStackNavigator({
    MainAuthScreen:{
        screen: MainAuth
    },
    SignUpScreen:{
        screen: SignUp
    },
    SignInScreen:{
        screen: SignIn
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