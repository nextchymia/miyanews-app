import React from 'react';
import { FlatList,ActivityIndicator } from 'react-native';
import { ListItem, Text, Left, Right, Body, Thumbnail, List, Content } from 'native-base';

export default class PriceScreen extends React.Component {
  static navigationOptions = {
    title: 'Price',
  };
  constructor(props){
    super(props);
    this.state ={ isRefreshing: false}
  }
  
  componentDidMount(){
    this._Refresh();
  }

  _keyExtractor = (item, index) => item.id.toString();

  _Refresh(){
    this.setState({isRefreshing: true});
    return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
      .then((response) =>  {
        return response.json();
        })
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
          isRefreshing: false,
        });
      })
      .catch((error) =>{
        error;
      });
  }


  _renderItem = ({item}) => {
    var card = 
    <ListItem>
          <Left>
          <Thumbnail source={{uri: item.image}}/>
          <Body>
          <Text>Rank: {item.market_cap_rank}</Text>
          <Text header>{item.id.charAt(0).toUpperCase()}{item.id.slice(1)}</Text>
          <Text note>Price(in USD): {item.current_price}</Text>
          <Text note>MarketCap(in USD): {item.market_cap}</Text>
          </Body>
          </Left>
    </ListItem>;
    return card;
  };



  render() {
    if(this.state.isRefreshing){
      return(
        <Content>
          <ActivityIndicator/>
        </Content>
      )
    }
    return (
      <List>
      <FlatList
      data={this.state.dataSource}
      renderItem={this._renderItem.bind(this)}
      refreshing={this.state.isRefreshing}
      onRefresh={this._Refresh.bind(this)}
      keyExtractor={this._keyExtractor}
      emptyText="No Items"
    />
      </List>
    );
  }
}
