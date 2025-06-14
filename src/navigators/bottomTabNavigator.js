import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screen from '../screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '../assets/Icons';

const BottomTab = createBottomTabNavigator();

const MyTabBar = props => {
  const instes = useSafeAreaInsets();
  // console.log("BottomTabb :", props);
  return (
    <View
      style={{
        width: '100%',
        height: 80,
        backgroundColor: 'black',
        bottom: 0,
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {props.tabValue.slice(0, 5).map((item, index) => {
            var selectedIndex = index;
            var propsIndex = props.state.index;

            if (
              (props.state.index == 5 ||
                props.state.index == 6 ||
                props.state.index == 7 ||
                props.state.index == 8) &&
              index == 1
            ) {
              selectedIndex = 1;
              propsIndex = 1;
            } else if (props.state.index == 9 && index == 2) {
              selectedIndex = 2;
              propsIndex = 2;
            }
            return (
              <TouchableOpacity
                key={item.screen}
                onPress={() => props.navigation.navigate(item.screen)}
                style={{
                  alignItems: 'center',
                  // width: "20%",
                  flex: 1,
                  paddingVertical: 10,
                }}
              >
                {propsIndex == selectedIndex ? (
                  <Image
                    source={Icons[item.icon]}
                    style={{
                      tintColor: 'black',
                      height: 25,
                      aspectRatio: 1,
                      marginTop: 0,
                      marginBottom: 8,
                    }}
                  />
                ) : (
                  <Image
                    source={Icons[item.icon]}
                    style={{
                      height: 25,
                      aspectRatio: 1,
                      marginTop: 0,
                      marginBottom: 8,
                    }}
                  />
                )}
                <Text
                  numberOfLines={1}
                  style={
                    propsIndex == selectedIndex
                      ? {
                          color: 'black',
                          fontWeight: '500',
                          fontSize: 12,
                        }
                      : {
                          color: 'black',
                          fontWeight: '400',
                          fontSize: 12,
                        }
                  }
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

class bottomTabNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: [
        { icon: 'icnHome', text: 'Search', screen: 'Search' },
        { icon: 'icnEvents', text: 'Events', screen: 'Events' },
        {
          icon: 'icnFavorite',
          text: 'Favourites',
          screen: 'Favourites',
        },
        {
          icon: 'icnUser',
          text: 'Profile',
          screen: 'Profile',
        },
      ],
    };
  }

  _addScreen(name, component, option) {
    return (
      <BottomTab.Screen name={name} component={Screen[name]} options={option} />
    );
  }

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            // paddingTop: StatusBar.currentHeight,
            backgroundColor: 'blue',
          }}
        >
          <BottomTab.Navigator
            backBehavior="history"
            tabBar={props => {
              var tabValue = { ...props, ...this.state };
              return <MyTabBar {...tabValue} />;
            }}
            sceneContainerStyle={{ paddingBottom: '0%' }}
            screenOptions={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerBackVisible: false,
              headerShadowVisible: false,
              headerTitle: '',
            }}
            // initialRouteName={""}
          >
            {this._addScreen('Search', {}, { headerShown: false })}
            {this._addScreen('Events', {}, { headerShown: false })}
            {this._addScreen('Favourites', {}, { headerShown: false })}
            {this._addScreen('Profile', {}, { headerShown: false })}
          </BottomTab.Navigator>
        </View>
      </>
    );
  }
}

export default bottomTabNavigation;
