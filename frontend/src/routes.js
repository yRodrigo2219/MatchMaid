import { createStackNavigator, 
    createAppContainer, 
    createSwitchNavigator } from 'react-navigation';
    
import MainAuth from "./pages/Auth/MainAuth";
import SignUp from "./pages/Auth/SignUp";
import UserSignUp from "./pages/Auth/UserSignUp";
import MaidSignUp from "./pages/Auth/MaidSignUp"
import AuthLoading from "./pages/Auth/AuthLoading"

import MainAppScreen from './pages/App/MainApp'

import UserPerfilScreen from './pages/App/UserPerfilScreen'

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
    }
);
const AppNavigator = createStackNavigator({
    MainAppScreen:{
        screen: MainAppScreen
    },
    UserPerfilScreen:{
        screen: UserPerfilScreen
        }
    }
);

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