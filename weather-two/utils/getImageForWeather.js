const image = {
    Clear: require('../assets/Clear.jpg'),
    Showers: require('../assets/Rain.jpg'),
    Thunder: require('../assets/Storm.jpg'),
}

export default weather => image[weather];