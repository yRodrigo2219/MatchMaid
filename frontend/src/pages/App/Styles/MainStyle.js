import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    toTopButton:{
        width: 35,
        height: 35,
        position: 'absolute',
        right: 7,
        bottom: 7,
    },
    toTopImage:{
        height: 35,
        width: 35,
    },
    filterButton:{
        height: 40,
        width: 97,
        flex: -1,
        top: 10,
        marginLeft: 10
    },
    filterImage:{
        height: 40,
        width: 97,
        flex: -1,
    },
    filterView:{
        flexDirection: 'row',
    },
    filterSearch:{
        flex: 1,
        height: 55
    },
    maidProfile:{
        margin: 5,
        backgroundColor: '#E8E8E8',
        padding: 10,
        borderRadius: 10
    },
    perfil:{
        flexDirection: 'row',
    },
    perfilImage:{
        width: 75,
        height: 75,
        marginRight: 10
    },
    namePerfil:{
        fontSize: 22,
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    subPerfil:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        flex: 1,
    },
    valuePerfil:{
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '100'
    },
    distancePerfil:{
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '100'
    },
    wppImage:{
        height: 25,
        width: 25,
        marginRight: 10
    }
})