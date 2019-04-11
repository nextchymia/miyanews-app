import React, {Component} from 'react';
import { WebView } from 'react-native';

export default class Post extends Component {
  render() {
    const { navigation } = this.props;
    //const content = navigation.getParam('content', '');
    const link = navigation.getParam('link', '');
    return (
      <WebView
        source={{uri: link}}
      />
    );
  }
}