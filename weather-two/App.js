
import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, ActivityIndicator, StatusBar } from 'react-native';
import { fetchLocationId, fetchWeather } from './utils/api';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      temperature: 0,
      weather: '',
      location: ''
    }
  }
  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId
        );
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        });
      } catch (e) {
        //console.log(e)
        this.setState({
          loading: false,
          error: true
        })
      }
    });
  };

  componentDidMount = () => {
    this.handleUpdateLocation('San Francisoc');
  }

  render() {
    // <View style={styles.container}>
    //   <ImageBackground source={require('./assets/Rain.jpg')} style={styles.image}>
    //       <Text style={[styles.largeText, styles.textStyle]}>San Francisco</Text>
    //        <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
    //        <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
    //      <SearchInput placeholder="Search any city" />
    //   </ImageBackground>
    // </View>
    const { loading, error, location, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}

      >
        <StatusBar barStyle='light-content' />
        <View style={styles.inner}>
          <ImageBackground
            source={getImageForWeather(weather)}
            style={styles.backgroundImage}
          >
            <View style={styles.detailsContainer}>
              <ActivityIndicator animating={loading} color='white' size='large' />

              {
                !loading && (
                  <View>
                    {
                      error && (
                        <Text style={[styles.smallText, styles.textStyle]}>
                          Could not load weather, please try a different city.
                        </Text>
                      )
                    }

                    {
                      !error && (
                        <View>
                          <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                          <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                          <Text style={[styles.largeText, styles.textStyle]}>
                            {`${Math.round(temperature)}°`}
                          </Text>
                        </View>
                      )
                    }
                  </View>
                )
              }
              <SearchInput placeholder="Search any city" onSubmit={this.handleUpdateLocation} />
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    )
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    // padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  background: {
    flex: 1,
    flexDirection: "column"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  red: {
    color: 'red'
  },
  textStyle: {
    textAlign: 'center',
    //fontFamily:Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      }
    }),

  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18
  },
  // imageContainer:{
  //   flex:1
  // },
  // image:{
  //   flex:1,
  //   width:null,
  //   height:null,
  //   resizeMode:'cover'
  // },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  detailsContainer: {
    // flex:1,
    //justifyContent: 'center',
    //backgroundColor: 'rgba(0,0,0,0.2)',
    // paddingHorizontal:20,
  }
});
