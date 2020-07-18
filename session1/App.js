import EventList from "./EventList";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from './constants/color';
import Header from './components/header';

export default function App() {
  return (
    <View style={styles.centerScreen}>
      <Header title="Count Down"/>
      <EventList />
    </View>
  );
}

const styles = StyleSheet.create({
  centerScreen: {
    flex: 1,
    paddingTop:0,
  },

});
