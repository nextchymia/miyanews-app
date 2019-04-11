import React from 'react';
import { Button, Container, Header, Content, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Container>
        <Header />
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "black" }}>
                <Icon active name="color-palette" />
              </Button>
            </Left>
            <Body>
              <Text>Dark Theme</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
