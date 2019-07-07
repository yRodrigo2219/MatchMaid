import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const AppNavigator = createStackNavigator({
    MainScreen:{
        screen: Main
    },
    SignUpScreen:{
        screen: SignUp
    },
    SignInScreen:{
        screen: SignIn
    }
});

export default createAppContainer(AppNavigator);