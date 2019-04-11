import React from 'react';
import { Container,  Content, Text, ListItem } from 'native-base';
import { WebBrowser} from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Useful Links',
  };
  state = {
    result: null,
  };
  constructor(props){
    super(props);
  }

  _handlePressEmurgo = async () => {
    WebBrowser.openBrowserAsync('http://emurgo.io');
  };

  _handlePressCardanoUpdate = () => {
    WebBrowser.openBrowserAsync('https://cardanoupdate.space/');
  };

  _handlePressEmurgoLance = () => {
    WebBrowser.openBrowserAsync('https://emurgolance.org/');
  };

  _handlePressEmurpas = () => {
    WebBrowser.openBrowserAsync('https://emurpas.org/');
  };

  _handlePressCoinMarket = () => {
    WebBrowser.openBrowserAsync('https://coinmarketcap.com/');
  };

  render(){
    const { navigate } = this.props.navigation;
    return(
    <Container>
        <Content>
          <ListItem itemDivider button onPress={this._handlePressEmurgo}> 
              <Text>Emurgo HK</Text>
          </ListItem>    
          <ListItem button onPress={this._handlePressCardanoUpdate}> 
            <Text>Cardano Update Space</Text>
          </ListItem>          
          <ListItem button onPress={this._handlePressEmurgoLance}> 
            <Text>Emurgolance</Text>
          </ListItem>
          <ListItem button onPress={this._handlePressEmurpas}> 
            <Text>Emurpas</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>Crypto Market Movement</Text>
          </ListItem>  
          <ListItem button onPress={this._handlePressCoinMarket}> 
            <Text>Coin Market Cap</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }

}

