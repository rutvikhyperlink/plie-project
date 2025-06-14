import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainNavigation from './src/navigators/stackNavigator';
import Login from './src/screens/Login';
import Store from './src/Reducer/Store';
import { Provider } from "react-redux";


const App = () => {
  const store = Store();
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
