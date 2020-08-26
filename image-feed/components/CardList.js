import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { getImageFromId } from '../utils/api';
import Card from './Card';

const keyExtractor = ({ id }) => id.toString();

export default class CardList extends React.Component {
    /**
     * We can use PropTypes.shape() to validate an object, passing the keys of the values we want to
validate. We can use PropTypes.array() to validate an array, passing the type of the element.
     */
    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                author: PropTypes.string.isRequired
            })
        ).isRequired,
        commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        onPressComments: PropTypes.func.isRequired
    };
    /*
    renderItem = (obj) => {
    const id = obj.item.id;
    const author = obj.item.author;
    }
    
    */
    renderItem = ({ item: { id, author } }) => {
        const { commentsForItem, onPressComments } = this.props;
        const comments = commentsForItem[id];   

        return (
            <Card
                fullname={author}
                image={{
                    uri: getImageFromId(id)
                }}
                linkText={`${comments ? comments.length : 0} Comments`}
                onPressLinkText={() => onPressComments(id)}
            />
        )
    }

    render() {
        const { items, commentsForItem } = this.props;
        return (
            <FlatList
                data={items}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
                extraData={commentsForItem}
            />
        )
    }
}



