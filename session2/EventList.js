import React from "react";
import { Text, View, StyleSheet, StatusBar, FlatList, TouchableHighlight } from "react-native";
import EventCard from "./EventCard";


const styles = StyleSheet.create({
    centerScreen: {
          flex: 1,
    },
    list:
    {
        flex:1,
        paddingTop:20,
        backgroundColor:'#F3F3F3'
    }
});


//props, arrow function
class EventList extends React.Component {
    state = {
        events: []
    }

    handleAddPress = () => {
        //writing code
        console.log("Click Me");
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                events: this.state.events.map(evt => ({
                    ...evt,
                    timer: Date.now(),
                }))
            })
        }, 1000);

        const events = require('./db.json').events;
        this.setState({ events });
        console.log(events);
    }

    render() {
        return (
            <View style={styles.centerScreen}>
                <FlatList
                    style={styles.list}
                    key="flatlist"
                    data={this.state.events}
                    renderItem={({ item }) => <EventCard event={item} />}
                >
                </FlatList>
            </View>
        )
    }
}

export default EventList;