import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import Color from '../constants/color';

class Header extends React.Component{


    render(){
        return(
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:50,        
        backgroundColor:Color.primary,
        alignItems:'center',
        justifyContent:'center',
        
    },
    headerTitle:{
        color:Color.titleColor,
        fontSize:20,
        fontWeight:'bold',
    }
});

export default Header;


