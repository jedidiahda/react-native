import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import AuthorRow from './AuthorRow';

export default class Card extends React.Component{
    static propTypes = {
        fullname: PropTypes.string.isRequired,
        /*Image.propTypes.source as the type, so that we can pass this directly into the source prop of the
            Image we’ll render.*/
        image: Image.propTypes.source.isRequired,
        linkText: PropTypes.string,
        onPressLinkText: PropTypes.func,
    };

    static defaultProps = {
        linkText: '',
        onPressLinkText: () => {},
    }

    state = {
        loading: true,
    }

    handleLoad = () => {
        this.setState({loading: false});    
    }

    render(){
        const { fullname, image, linkText, onPressLinkText } = this.props;
        const { loading } = this.state;

        return (
            <View >
                <AuthorRow 
                    fullname={fullname}
                    linkText={linkText}
                    onPressLinkText={onPressLinkText}
                />
                <View style={styles.image}>
                    {
                        loading && (
                            <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
                        )
                    }
                    <Image style={StyleSheet.absoluteFill} source={image} onLoad={this.handleLoad}/>
                </View>
                
            </View>
        )
    }
}
/*
We use aspectRatio: 1 to make the height of the
Image match its full-screen width, rendering as a perfect square
We put a backgroundColor on the
Image which will show before the image loads, or behind the image if the image is transparent.
*/
const styles = StyleSheet.create({
    image:{
        aspectRatio:1,
        backgroundColor:'rgba(0,0,0,0.02)',
    }
})