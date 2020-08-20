import { StatusBar } from 'expo-status-bar';
import uuidv4 from 'uuid/v4';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, } from 'react-native';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import EditableTimer from './components/EditableTimer';
import { newTimer } from './utils/TimerUtils';

export default class App extends React.Component {
  state = {
    timers: [
      {
        title: 'Mov the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: false,
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false,
      },
    ]
  }

  handleCreateFormSubmit = timer => {
    const { timers } = this.state;
    this.setState({
      timers: [newTimer(timer), ...timers]
    })
  }
  handleFormSubmit = attrs => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;
          return {
            ...timer,
            title,
            project,
          };
        }
        return timer;
      }),
    });
  };

  handleRemovePress = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    })
  }

  componentDidMount = () => {
    const TIME_INTERVAL = 1000;
    console.log('did mount')
    this.intervalId = setInterval(() => {
      const { timers } = this.state;
      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          }
        })
      });

    }, TIME_INTERVAL);
  }
  componentWillUnmount = () => {
    console.log('unmount')
    clearInterval(this.intervalId);
  }


  toggleTimer = timerId => {
    this.setState(preState => {
      const { timers } = preState;

      return {
        timers: timers.map(timer => {
          const { id, isRunning } = timer;
          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning
            }
          }

          return timer;
        })
      }

    })
  }

  render() {
    const { timers } = this.state;
    //console.log(timers)

    const rows = [];

    timers.map(({ title, project, id, elapsed, isRunning }) => {
      rows.push(
        <EditableTimer
          key={id}
          id={id}
          title={title}
          project={project}
          elapsed={elapsed}
          isRunning={isRunning}
          onFormSubmit={this.handleFormSubmit}
          onRemovePress={this.handleRemovePress}
          onStartPress={this.toggleTimer}
          onStopPress={this.toggleTimer}
        />

      )
    });

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timeList}>
          <ToggleableTimerForm isOpen={false} onFormSubmit={this.handleCreateFormSubmit} />
          {rows}
        </ScrollView>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  timeList: {
    paddingBottom: 15,
  }
});
