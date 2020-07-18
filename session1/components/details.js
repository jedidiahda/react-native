import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView,View } from 'react-native';
import Constants from 'expo-constants';

class Details extends React.Component{
    render(){
        return(
            <View>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.text}>
                            {this.props.text}
                        </Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        
      },
      scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },
      text: {
        fontSize: 42,
      },
});


export default Details;