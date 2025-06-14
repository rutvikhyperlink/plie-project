import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomTabNav from './bottomTabNavigator';
import * as Screen from '../screens';
import { StatusBar, View } from 'react-native';

const Stack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();

const MainNavigation = props => {
  const _addScreen = (name, component, option) => {
    return (
      <Stack.Screen name={name} component={Screen[name]} options={option} />
    );
  };

  const addModalScreen = (name, component, option) => {
    return (
      <ModalStack.Screen name={name} component={component} options={option} />
    );
  };

  const MainStackScreen = () => {
    return (
      <Stack.Navigator
     
        initialRouteName={"Login"}
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: '',
          orientation: 'portrait',
        }}
      >
        <Stack.Screen name={'BottomTab'} component={BottomTabNav} />
        {_addScreen('Login', {}, { headerShown: false })}
        {_addScreen('Search', {}, { headerShown: false })}
        {_addScreen('Events', {}, { headerShown: false })}
        {_addScreen('Favourites', {}, { headerShown: false })}
        {_addScreen('Profile', {}, { headerShown: false })}
      </Stack.Navigator>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar
        backgroundColor={'transparent'} //transparent
        barStyle="light-content"
        translucent={true}
      />
      <NavigationContainer>
        <ModalStack.Navigator
          initialRouteName="MainStackScreen"
          screenOptions={{
            headerShown: false,
            // presentation: "transparentModal",
            // animation: "slide_from_bottom",
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitle: '',
            orientation: 'portrait',
          }}
        >
          {addModalScreen('MainStackScreen', MainStackScreen)}
        </ModalStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainNavigation;
