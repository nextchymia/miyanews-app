/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Image} from 'react-native';
import _WP from 'react-wp-api';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';
import { stringify } from 'querystring';


var WP = new _WP('http://miyanews.com')

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { isShowingText: false };
    this.state = ({ medias: []});
    // console.log(this.state.isShowingText);
    WP.Posts().then((results) => {
      // console.log(results)
      this.setState ({ isShowingText: true });
      this.setState({ posts: results });
      //this.setState({ medias: [{}]});
      // console.log(this.state.posts);
      results.forEach((item) => {
          WP.Media({ id: item.featured_media }).then((result) => {
              medias = this.state.medias;
              medias[result.id] = {
                  thumbnail: result.media_details.sizes.thumbnail.source_url,
                  fullImage: result.media_details.sizes.full.source_url
              }             
              this.setState({ medias : medias });
              //console.log(this.state.medias);
          }).catch(err=> console.log(err))
      }, this);
  }).catch(err=>err)  
  }

  render() {
      if (!this.state.isShowingText) {
        return null;
      }
      var CardList = 
      <CardItem bordered>
        <Body>
      {/* <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/> */}
          <Text>
          Loading
          </Text>
        </Body>
      </CardItem>;
      try{
          CardList  = this.state.posts.map((selecteditem) => {
            //var qwe = JSON.stringify(this.state.medias[selecteditem.featured_media]);
            //console.log(qwe);
            //console.log(this.state.medias[selecteditem.featured_media]);
        return (
        <Card key={selecteditem.id}>  
          <CardItem cardBody button key={selecteditem.id}>
          <Body>
            <Text>
            {selecteditem.title.rendered}
            </Text>
          </Body>      
        </CardItem>
        <CardItem cardBody>
              <Image source={{uri: 'http://miyanews.com/wp-content/uploads/2018/02/mcsdtbwxuzu.jpg'}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
      </Card>
        );
     });}catch(err){ console.log(err);}
    return (
      <Container>
      <Header>
      <Left>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>React Native WordPress Test</Title>
      </Body>
      <Right />
      </Header>
      <Content>
          {CardList}
      </Content>
      </Container>
    );
  }
}

