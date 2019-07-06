import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from "./pages/Main";

const AppNavigator = createStackNavigator({
    First:{
        screen: Main
    }
});

export default createAppContainer(AppNavigator);