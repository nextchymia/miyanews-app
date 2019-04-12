import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PriceScreen from '../screens/PriceScreen';
import Post from '../screens/Post';

let Currentcolor = 'Black';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Post: {
      screen: Post,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'News',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PriceStack = createStackNavigator({
  Settings: PriceScreen,
});

PriceStack.navigationOptions = {
  tabBarLabel: 'Prices',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'logo-bitcoin' : 'logo-bitcoin'}
    />
  ),
};


const LinksStack = createStackNavigator(
  {
    Links: {
      screen: LinksScreen,
    },
    Post: {
      screen: Post,
    },
  },
  {
    initialRouteName: 'Links',
  }
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


const BottomTab = createBottomTabNavigator({
  HomeStack,
  PriceStack,
  LinksStack,
  SettingsStack,
});

export default BottomTab;
