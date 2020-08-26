import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Constants from 'expo-constants';
import { AsyncStorage, StyleSheet, Text, View, Platform, Modal } from 'react-native';
import Feed from './screen/Feed';
import CardList from './components/CardList';
import Comments from './screen/Comments';

const items = [
  { id: 0, author: 'Bob Ross' },
  { id: 1, author: 'Chuck Norris' },
];
const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

export default class App extends React.Component {
  state = {
    commentsForItem: {},
    showModal: false,
    selectedItemId: null,
  }

  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      selectedItemId: null,
    })
  }

  openCommentScreen = (id) => {
    this.setState({
      showModal: true,
      selectedItemId: id
    })
  }

  onSubmitComment = text => {
    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    };

    this.setState({ commentsForItem: updated });

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log('Failed to save comment', text, 'for', selectedItemId);
    }

  }

  async componentDidMount() {
    try {
      const commentsForItem = await AsyncStorage.getItem(ASYNC_STORAGE_COMMENTS_KEY);
      this.setState({
        commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
      });
    } catch (e) {
      console.log('Failed to load comments');
    }
  }


  render() {
    const { commentsForItem, showModal, selectedItemId } = this.state;
    return (
      <View style={styles.container}

      >
        <Feed style={styles.feed}
          commentsForItem={commentsForItem}
          onPressComments={this.openCommentScreen}

        />

        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={this.closeCommentScreen}
        >
          <Comments
            style={styles.container}
            comments={commentsForItem[selectedItemId] || []}
            onClose={this.closeCommentScreen}
            onSubmitComment={this.onSubmitComment}
          />
        </Modal>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || Platform.Version < 11
        ? Constants.statusBarHeight
        : 0
  },
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' && Platform.Version < 11
        ? Constants.statusBarHeight
        : 0
  }
});
