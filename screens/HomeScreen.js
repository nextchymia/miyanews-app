/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Container } from 'native-base';
import PostList from '../components/PostsList'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: '米亚财经',
  };
  render() {
    return (
      <Container>
          <PostList navigation={this.props.navigation}/>
      </Container>
    );
  }
}


