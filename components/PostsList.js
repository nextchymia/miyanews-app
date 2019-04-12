import React from 'react';
import { View, FlatList , ActivityIndicator, StyleSheet} from 'react-native';
import { Text, Left, Body, Card, CardItem, Thumbnail, Container ,List,ListItem, Content} from 'native-base';
import HTML from 'react-native-render-html';

var link = "https://miyanews.com";

function parse_link_header(header) {
    if (header.length === 0) {
        throw new Error("input must not be of zero length");
    }

    // Split parts by comma
    var parts = header.split(',');
    var links = {};
    // Parse each part into a named link
    for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
}

export default class PostList extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isRefreshing: false, isLoading: false, medias: []}
  }
  
  componentDidMount(){
    this._Refresh();
  }

  _Refresh(){
    this.setState({isRefreshing: true});
    return fetch(link + '/wp-json/wp/v2/posts?page=1')
      .then((response) =>  {
        //console.log(parse_link_header(response.headers.get('Link')).next);
        this.setState({
          next : parse_link_header(response.headers.get('Link')).next,
          });
        return response.json();
        })
      .then((responseJson) => {

        this.setState({
          dataSource: responseJson,
        });

        this.state.dataSource.forEach((item) => {
          return fetch(link+'/wp-json/wp/v2/media/'+item.featured_media)
          .then((response) => {
            return response.json();
          })
          .then((responseJson) =>{
            var medias = this.state.medias;
            medias[responseJson.id] = {
                      thumbnail: responseJson.media_details.sizes.thumbnail.source_url,
                      fullImage: responseJson.media_details.sizes.full.source_url
                  }
            this.setState({ medias : medias });
          }).catch((error) =>{
            error;
          });
        },this);


        this.setState({
          isRefreshing: false,
        });
      })
      .catch((error) =>{
        error;
      });
  }

  _Load(){
    this.setState({isLoading: true});
    if(this.state.next == undefined){
      this.setState({isLoading: false});
      return;
    }
    return fetch(this.state.next)
      .then((response) =>  {
        //console.log(parse_link_header(response.headers.get('Link')).next);
        this.setState({
          next : parse_link_header(response.headers.get('Link')).next,
          });
        return response.json();
        })
      .then((responseJson) => {
        var data = [...this.state.dataSource, ...responseJson];
        this.setState({
          dataSource: data,
        });

        this.state.dataSource.forEach((item) => {
          return fetch('https://miyanews.com/wp-json/wp/v2/media/'+item.featured_media)
          .then((response) => {
            return response.json();
          })
          .then((responseJson) =>{
            var medias = this.state.medias;
            medias[responseJson.id] = {
                      thumbnail: responseJson.media_details.sizes.thumbnail.source_url,
                      fullImage: responseJson.media_details.sizes.full.source_url
                  }
            this.setState({ medias : medias });
          }).catch((error) =>{
            (error)
          })
        },this);
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) =>{
        (error)
      });
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({item}) => {
    const { navigate } = this.props.navigation;
    var imgurl = 'https://sophosnews.files.wordpress.com/2018/02/shutterstock_725383297.jpg?w=780&h=408&crop=1';
    //console.log(this.state.medias);
    try{
      imgurl = this.state.medias[item.featured_media].thumbnail;
    }
    catch{(err)=>err}
    var card = 
    <ListItem button onPress={() => navigate('Post', { link:item.link})}>
          <Left>
          <Thumbnail source={{uri: imgurl}}/>
          <Body>
          <Text header>{item.title.rendered}</Text>
          <HTML baseFontStyle={styles.ExcerptText} html={item.excerpt.rendered} />
          </Body>
          </Left> 
    </ListItem>;
    return card;
  };

  render(){

    if(this.state.isRefreshing){
      return(
        <Content>
          <ActivityIndicator/>
        </Content>
      )
    }

    return(
      <List>
          <FlatList
              data={this.state.dataSource}
              renderItem={this._renderItem.bind(this)}
              loading={this.state.isLoading}
              refreshing={this.state.isRefreshing}
              onRefresh={this._Refresh.bind(this)}
              onEndReached={this._Load.bind(this)}
              onEndReachedThreshold={0.07}
              keyExtractor={this._keyExtractor}
              emptyText="No Items"
            />
      </List>
    );
  }

}

const styles = StyleSheet.create({
  ExcerptText: {
    fontSize: 13,
  },
});