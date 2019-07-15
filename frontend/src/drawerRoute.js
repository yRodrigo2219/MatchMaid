import { createAppContainer, 
    createDrawerNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';

import MainApp from './pages/App/MainApp';
import FilterMenu from './pages/App/FilterMenu';

const FilterNavigator =  createDrawerNavigator({
    MainAppScreen:{
        screen: MainApp
    }
}, {
    contentComponent: FilterMenu,
    drawerWidth: 300,
    drawerPosition: 'right'
});

const defaultGetStateForAction = FilterNavigator.router.getStateForAction;

FilterNavigator.router.getStateForAction = (action, state) => {
    if (action.willShow === false) { //action.type === "Navigation/DRAWER_CLOSED"
        AsyncStorage.setItem('DrawerState', "Closed");
    }else if(action.willShow === true){
        AsyncStorage.setItem('DrawerState', "Opened");
    }
    return defaultGetStateForAction(action, state);
};

export default createAppContainer(FilterNavigator);