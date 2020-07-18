import React from "react";
import { Text, View, StyleSheet, StatusBar, FlatList, TouchableHighlight } from "react-native";
import EventCard from "./EventCard";
import Details from './components/details';


const styles = StyleSheet.create({
    list:
    {
        // flex:1,
        paddingTop:20,
        backgroundColor:'#F3F3F3'
    }
});


//props, arrow function
class EventList extends React.Component {
    state = {
        events: [],
        details:[],
        color:'',
        isShowDetail:false,
        itemDes:{},
    }

    handleAddPress = () => {
        //writing code
        console.log("Click Me");
        this.setState({
            color: 'blue'
        })
    }

    swithToDetail = itemId =>{
        this.setState({
            isShowDetail:true,
            itemDes: () => this.state.details.map( a => a.id == itemId)
        })
        console.log(this.state.itemDes)
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
        // const events = require('./db.json').events;
        const data = require('./db.json');
        this.setState({ events: data.events });
        console.log(data);
    }

    render() {
        return (
            <View>
                <FlatList
                    style={styles.list}
                    key="flatlist"
                    data={this.state.events}
                    renderItem={({ item }) => <EventCard event={item} id={item.id} />}
                >
                </FlatList>
                <Details onVisible={this.state.isShowDetail} text={this.state.itemDes.desc}></Details>
            </View>
        )
    }
}

export default EventList;