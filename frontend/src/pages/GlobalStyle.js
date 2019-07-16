import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonGlobal:{ 
        height : 40,
        width : 200,
        backgroundColor : '#1CC0E8',
        borderRadius :10,
        borderWidth :2,
        borderColor :'#1C44E8',
        marginTop : 30,
        alignItems :'center',
        paddingTop : 10,
        paddingLeft : -30
        },
    alinhamento :{
        alignItems: 'center', 
        marginTop : 100  
    },
    alinhamentoSemMargem:{
        alignItems: 'center'
    },
    textInputGlobal:{
        height:40,
        marginTop : 40,
        borderWidth: 1,
        width:350,
        borderRadius : 5,
        borderColor: 'black',
        alignItems : 'center'
    },
    fonte:{
        fontWeight : 'bold',
        paddingLeft : 20,
        alignItems : 'center'
    },
    check:{
        alignItems : 'flex-start',
        flex : 1
    },
    corAzulEscuro:{
        backgroundColor : '#1C44E8'
    }
});